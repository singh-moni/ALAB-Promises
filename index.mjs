// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  // try{
  // let waiting = await dbs.db1(id);
  // console.log(waiting);
  // }catch{
  // }
  console.log(dbs.db1(id));
  // Promise.any([dbs.db1(id), dbs.db2(id), dbs.db3(id)])
  //   .then((x) => {
  //     console.log(x);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Promise.resolve(dbs.db1(id))
    .then((x) => {
      console.log(x);
    })
    .catch((err) => {
      console.log(err);
    });
}


// //--------------------------------------------------------//async function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };
//   try {
//     let waiting = await dbs.db1(id);
//     console.log(waiting);
//   } catch {
//     console.log(err);
//   }
//   console.log(dbs.db1(id));
//   // Promise.any([dbs.db1(id), dbs.db2(id), dbs.db3(id)])
//   //   .then((x) => {
//   //     console.log(x);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
//   // Promise.resolve(dbs.db1(id))
//   //   .then((x) => {
//   //     console.log(x);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// //--------------------------------------------------------------------------//
// async function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };
//   Promise.all([vault(id)])
//     .then((x) => {
//       console.log(x);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }
// //------------------------------------------------------------------//
// async function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };
//   let waiting = await central(id);
//   console.log(waiting);
//   // Promise.any([central(id)])
//   //   .then((x) => {
//   //     console.log(x);
//   //   })
//   //   .catch((err) => {
//   //     console.error(err);
//   //   });
//   //   Promise.resolve()
// }
import { central, db1, db2, db3, vault } from "./databases.mjs";

async function assembleUserData(id) {
  try {
    // Get the name of the database to access for user information
    const dbName = await central(id);

    // Retrieve user information from the appropriate database
    const userData = await dbs[dbName](id);

    // Retrieve personal data from the vault database
    const personalData = await vault(id);

    // Assemble the final user data object
    const assembledData = {
      id: id,
      name: personalData.name,
      username: userData.username,
      email: personalData.email,
      address: personalData.address,
      phone: personalData.phone,
      website: userData.website,
      company: userData.company
    };

    return assembledData;
  } catch (error) {
    // If any of the database access fails, return a rejected promise with the error message
    return Promise.reject(error.message || "Failed to assemble user data");
  }
}

// Testing the function with user IDs between 1 and 10
for (let id = 1; id <= 10; id++) {
  assembleUserData(id)
    .then((userData) => {
      console.log("User data for ID", id, ":", userData);
    })
    .catch((error) => {
      console.error("Error fetching user data for ID", id, ":", error);
    });
}



