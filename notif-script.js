// // // 1. Initialize Supabase Client

// // const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // const notificationContainer = document.getElementById('notification-container');

// // // Function to display a notification on the screen
// // function displayNotification(message) {
// //     const notifDiv = document.createElement('div');
// //     notifDiv.className = 'notification';
// //     notifDiv.textContent = message;

// //     // Add it to the container
// //     notificationContainer.prepend(notifDiv);

// //     // Trigger the CSS transition to show it
// //     setTimeout(() => {
// //         notifDiv.classList.add('show');
// //     }, 10);

// //     // Automatically remove the notification after 5 seconds
// //     setTimeout(() => {
// //         notifDiv.classList.remove('show');
// //         // Remove from DOM after transition completes (0.5s)
// //         setTimeout(() => {
// //             notificationContainer.removeChild(notifDiv);
// //         }, 500); 
// //     }, 5000);
// // }

// // // 2. Subscribe to Realtime changes on the 'notifications' table
// // supabase
// //     .channel('table-db-changes') // Choose a unique channel name
// //     .on(
// //         'postgres_changes',
// //         { 
// //             event: 'INSERT', // Only listen for new row inserts (new notifications)
// //             schema: 'public',
// //             table: 'notifications' // Your table name
// //         },
// //         (payload) => {
// //             console.log('New notification received:', payload);
            
// //             // Get the message from the inserted row data
// //             const newMessage = payload.new.message; 
            
// //             // Display the notification
// //             if (newMessage) {
// //                 displayNotification(`📢 New Notification: ${newMessage}`);
// //             }
// //         }
// //     )
// //     .subscribe();

// // // Optional: Display a welcome/test message
// // displayNotification("App Loaded! Waiting for new Supabase inserts...");






// // =======================================================
// // 1. CONFIGURATION: Replace these with your actual keys!
// // =======================================================
// const SUPABASE_URL = 'https://pfjllceuucuzkgulpjqc.supabase.co'; // e.g., 'https://xyzabcd.supabase.co'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmamxsY2V1dWN1emtndWxwanFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDc5MzEsImV4cCI6MjA3NjU4MzkzMX0.zvIr0ioNX0I5hKTWgYOsYQIPV0MtozfnirEHmkmxU48'; // This is the 'anon' public key

// // =======================================================
// // 2. INITIALIZATION: Create the Supabase client FIRST.
// // =======================================================
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // =======================================================
// // 3. DOM ELEMENTS & HELPER FUNCTION
// // =======================================================
// const notificationContainer = document.getElementById('notification-container');

// /**
//  * Creates and displays a dynamic notification on the screen.
//  * @param {string} message The text content of the notification.
//  */
// function displayNotification(message) {
//     const notifDiv = document.createElement('div');
//     notifDiv.className = 'notification';
//     notifDiv.textContent = message;

//     // Add it to the top of the container
//     notificationContainer.prepend(notifDiv);

//     // Trigger the CSS transition to show it (using a slight delay)
//     setTimeout(() => {
//         notifDiv.classList.add('show');
//     }, 10);

//     // Automatically remove the notification after 5 seconds
//     const DURATION = 5000;
//     const TRANSITION_TIME = 500; // Must match the CSS transition duration

//     setTimeout(() => {
//         notifDiv.classList.remove('show');
        
//         // Remove from DOM after the fade-out transition completes
//         setTimeout(() => {
//             // Check if the element is still in the DOM before trying to remove it
//             if (notificationContainer.contains(notifDiv)) {
//                 notificationContainer.removeChild(notifDiv);
//             }
//         }, TRANSITION_TIME); 

//     }, DURATION);
// }

// // =======================================================
// // 4. REALTIME SUBSCRIPTION
// // =======================================================

// supabase
//     .channel('notifications-channel') // A unique channel name for this subscription
//     .on(
//         'postgres_changes',
//         { 
//             event: 'INSERT', // Listen ONLY for new rows being added
//             schema: 'public',
//             table: 'notifications' // The name of your database table
//         },
//         (payload) => {
//             console.log('Realtime Event Received:', payload);
            
//             // Extract the message from the new row data
//             const newMessage = payload.new.message; 
            
//             // Display the notification if the message exists
//             if (newMessage) {
//                 displayNotification(`📢 New Notification: ${newMessage}`);
//             }
//         }
//     )
//     .subscribe();

// // Optional: Display a message when the script starts running
// displayNotification("App Initialized. Now listening for new notifications from Supabase.");



// // ✅ Import Supabase client
// import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// // ✅ Your Supabase credentials
// const SUPABASE_URL = 'https://pfjllceuucuzkgulpjqc.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmamxsY2V1dWN1emtndWxwanFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDc5MzEsImV4cCI6MjA3NjU4MzkzMX0.zvIr0ioNX0I5hKTWgYOsYQIPV0MtozfnirEHmkmxU48';

// // ✅ Initialize Supabase client
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // ✅ DOM references
// const notificationList = document.getElementById("notification-list");

// // ✅ Load notifications from Supabase
// async function loadNotifications() {
//   console.log("Fetching notifications from Supabase...");

//   const { data, error } = await supabase
//     .from('notifications')
//     .select('*')
//     .order('created_at', { ascending: false });

//   console.log("Supabase response:", { data, error });

//   if (error) {
//     notificationList.innerHTML = `<p class="error">⚠️ Error: ${error.message}</p>`;
//     return;
//   }

//   if (!data || data.length === 0) {
//     notificationList.innerHTML = `<p class="empty">No notifications yet 🎧</p>`;
//     return;
//   }

//   // ✅ Render notifications
//   notificationList.innerHTML = data
//     .map(
//       (n) => `
//       <div class="notification">
//         <h3>${n.title}</h3>
//         <p>${n.message}</p>
//         <span>${new Date(n.created_at).toLocaleString()}</span>
//       </div>`
//     )
//     .join("");
// }

// // ✅ Listen for realtime updates (live notifications)
// supabase
//   .channel('realtime:notifications')
//   .on(
//     'postgres_changes',
//     { event: '*', schema: 'public', table: 'notifications' },
//     (payload) => {
//       console.log('🔔 New change detected:', payload);
//       loadNotifications();
//     }
//   )
//   .subscribe();

// // ✅ Load notifications on startup
// loadNotifications();

















// ====================================================================
// // 🚨 IMPORTANT: REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL KEYS! 🚨
// // ====================================================================
// const SUPABASE_URL = 'https://pfjllceuucuzkgulpjqc.supabase.co'; 
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmamxsY2V1dWN1emtndWxwanFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDc5MzEsImV4cCI6MjA3NjU4MzkzMX0.zvIr0ioNX0I5hKTWgYOsYQIPV0MtozfnirEHmkmxU48'; // This is the 'anon' public key

// // =======================================================
// // 1. INITIALIZATION: The Supabase client must be created first.
// // =======================================================
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // =======================================================
// // 2. DOM ELEMENTS & HELPER FUNCTION
// // =======================================================
// const notificationContainer = document.getElementById('notification-container');

// /**
//  * Creates and displays a dynamic notification popup on the screen.
//  * @param {string} message The text content of the notification.
//  */
// function displayNotification(message) {
//     const notifDiv = document.createElement('div');
//     notifDiv.className = 'notification';
//     notifDiv.textContent = message;

//     // Add it to the top of the container
//     notificationContainer.prepend(notifDiv);

//     // Give the browser a moment to render before adding the 'show' class 
//     // to ensure the CSS transition runs.
//     setTimeout(() => {
//         notifDiv.classList.add('show');
//     }, 10);

//     // Configuration for notification duration and fade-out
//     const DURATION = 5000; // 5 seconds visible
//     const TRANSITION_TIME = 500; // 0.5 seconds for fade-out (must match CSS)

//     // Set timeout for removal
//     setTimeout(() => {
//         // Start the fade-out
//         notifDiv.classList.remove('show');
        
//         // Remove from DOM after the fade-out transition completes
//         setTimeout(() => {
//             if (notificationContainer.contains(notifDiv)) {
//                 notificationContainer.removeChild(notifDiv);
//             }
//         }, TRANSITION_TIME); 

//     }, DURATION);
// }

// // =======================================================
// // 3. REALTIME SUBSCRIPTION
// // =======================================================

// // Log connection attempt
// console.log('Attempting to subscribe to Supabase Realtime...');

// supabase
//     .channel('public:notifications') // Use 'public:notifications' for simplicity and clarity
//     .on(
//         'postgres_changes',
//         { 
//             event: 'INSERT', // Listen ONLY for new rows
//             schema: 'public',
//             table: 'notifications' // Your database table name
//         },
//         (payload) => {
//             console.log('✅ New Realtime Notification Event Received:', payload);
            
//             // Extract the message from the inserted row data
//             const newMessage = payload.new.message; 
            
//             if (newMessage) {
//                 displayNotification(`📢 New Notification: ${newMessage}`);
//             }
//         }
//     )
//     .subscribe((status) => {
//         if (status === 'SUBSCRIBED') {
//             console.log('✅ Successfully subscribed to the Realtime channel.');
//             displayNotification("App is active and listening for database inserts.");
//         } else if (status === 'CHANNEL_ERROR') {
//              console.error('❌ Realtime Channel Error. Check your RLS policies and table replication settings.');
//         }
//     });




import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// Your Supabase credentials
const SUPABASE_URL = 'https://pfjllceuucuzkgulpjqc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmamxsY2V1dWN1emtndWxwanFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDc5MzEsImV4cCI6MjA3NjU4MzkzMX0.zvIr0ioNX0I5hKTWgYOsYQIPV0MtozfnirEHmkmxU48';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const list = document.getElementById('notification-list');
const refreshBtn = document.getElementById('refresh-btn');

// Fetch notifications from Supabase
async function loadNotifications() {
  list.innerHTML = '<p class="loading">Loading notifications...</p>';

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = `<p style="color:red;">❌ Error loading notifications: ${error.message}</p>`;
    return;
  }

  if (data.length === 0) {
    list.innerHTML = '<p>No notifications yet.</p>';
    return;
  }

  list.innerHTML = '';
  data.forEach(note => {
    const div = document.createElement('div');
    div.className = 'notification';
    div.innerHTML = `
      <div class="notification-title">${note.title}</div>
      <div class="notification-message">${note.message}</div>
      <div class="notification-time">${new Date(note.created_at).toLocaleString()}</div>
    `;
    list.appendChild(div);
  });
}

refreshBtn.addEventListener('click', loadNotifications);
window.addEventListener('load', loadNotifications);

supabase
  .channel('realtime:notifications')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, payload => {
    console.log('🔔 New change detected:', payload);
    loadNotifications();
  })
  .subscribe();



