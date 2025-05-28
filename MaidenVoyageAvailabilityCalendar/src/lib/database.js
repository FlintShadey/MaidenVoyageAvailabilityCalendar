import { supabase, isSupabaseConfigured } from "./supabase.js";

export class DatabaseService {
  // Check if database is available
  static isAvailable() {
    return isSupabaseConfigured && supabase !== null;
  }

  // Fetch all user availability data
  static async getAllUserAvailability() {
    if (!this.isAvailable()) {
      throw new Error("Database not configured");
    }

    try {
      const { data, error } = await supabase
        .from("user_availability")
        .select("*")
        .order("user_name, selected_date");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching user availability:", error);
      throw error;
    }
  }

  // Fetch availability for a specific user
  static async getUserAvailability(userName) {
    if (!this.isAvailable()) {
      throw new Error("Database not configured");
    }

    try {
      const { data, error } = await supabase
        .from("user_availability")
        .select("selected_date")
        .eq("user_name", userName)
        .order("selected_date");

      if (error) throw error;
      return data?.map((item) => item.selected_date) || [];
    } catch (error) {
      console.error(`Error fetching availability for ${userName}:`, error);
      throw error;
    }
  }

  // Add a date for a user
  static async addUserDate(userName, date) {
    if (!this.isAvailable()) {
      throw new Error("Database not configured");
    }

    try {
      const { data, error } = await supabase
        .from("user_availability")
        .upsert({
          user_name: userName,
          selected_date: date,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error adding date for ${userName}:`, error);
      throw error;
    }
  }

  // Remove a date for a user
  static async removeUserDate(userName, date) {
    if (!this.isAvailable()) {
      throw new Error("Database not configured");
    }

    try {
      const { data, error } = await supabase
        .from("user_availability")
        .delete()
        .eq("user_name", userName)
        .eq("selected_date", date);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error removing date for ${userName}:`, error);
      throw error;
    }
  }

  // Set all dates for a user (replaces existing dates)
  static async setUserAvailability(userName, dates) {
    if (!this.isAvailable()) {
      throw new Error("Database not configured");
    }

    try {
      // Start a transaction by first deleting all existing dates for this user
      const { error: deleteError } = await supabase
        .from("user_availability")
        .delete()
        .eq("user_name", userName);

      if (deleteError) throw deleteError;

      // If no dates to insert, we're done
      if (!dates || dates.length === 0) {
        return [];
      }

      // Insert new dates
      const records = dates.map((date) => ({
        user_name: userName,
        selected_date: date,
        updated_at: new Date().toISOString(),
      }));

      const { data, error: insertError } = await supabase
        .from("user_availability")
        .insert(records)
        .select();

      if (insertError) throw insertError;
      return data;
    } catch (error) {
      console.error(`Error setting availability for ${userName}:`, error);
      throw error;
    }
  }

  // Subscribe to real-time changes
  static subscribeToChanges(callback) {
    if (!this.isAvailable()) {
      console.warn("Database not configured, skipping real-time subscription");
      return null;
    }

    const subscription = supabase
      .channel("user_availability_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_availability",
        },
        callback
      )
      .subscribe();

    return subscription;
  }

  // Unsubscribe from changes
  static unsubscribe(subscription) {
    if (!this.isAvailable() || !subscription) {
      return;
    }
    supabase.removeChannel(subscription);
  }
}
