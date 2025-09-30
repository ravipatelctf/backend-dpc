
// // -------------------------------------------------------------------------------------
// // Function to seed events collection with initial data
// async function seedEventsCollection() {
//     try {
//         const newEvent = new Event({
//             name: "AI conclave",
//             dateTime: new Date("2025-11-12T10:00:00Z"),
//             location: "New Delhi, India",
//             description: "This event is organized by Nvidia. The CEO of Nvidia will take the stage to talk about the future of AI."
//         });
//         const savedEvent = await newEvent.save();
//         if (savedEvent) {
//             console.log("events collection seeded successfully.")
//         }
//         return;
//     } catch (err) {
//         throw new Error("Failed to seed events collection:", err);
//     }
// }
// seedEventsCollection();
// // -------------------------------------------------------------------------------------