// Standard library imports
use std::fmt;

// External crates imports
use serde_json::Value;
use tauri::Window; // Assuming serde_json is used for the `payload` parameter

pub enum EventName {
    StatusIdle,
    StatusBuildingTree,
    StatusSearching,
}

impl fmt::Display for EventName {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            match self {
                EventName::StatusIdle => "status_idle",
                EventName::StatusBuildingTree => "status_building_tree",
                EventName::StatusSearching => "status_searching",
            }
        )
    }
}

pub fn emit_event(window: &Window, event_name: EventName, payload: Value) {
    window
        .emit(&event_name.to_string(), Some(payload))
        .expect("Failed to send event");
}
