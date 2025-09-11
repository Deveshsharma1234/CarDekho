"# CarDekho"

1️⃣ User APIs (userRouter)
| Feature                 | Method | Path                   | Roles                                        | DB Table |
| ----------------------- | ------ | ---------------------- | -------------------------------------------- | -------- |
| Get all users           | GET    | `/users`               | Admin, SupportStaff, Verifier                | `users`  |
| Get user by ID          | GET    | `/users/:UserId`       | Admin, GovernmentEmp, SupportStaff, Verifier | `users`  |
| Get own profile         | GET    | `/users/me`            | All                                          | `users`  |
| Update own profile      | PATCH  | `/users`               | All                                          | `users`  |
| Soft delete own account | DELETE | `/users`               | All                                          | `users`  |
| Admin deactivate user   | DELETE | `/users/:UserId`       | Admin                                        | `users`  |
| Block/Unblock user      | PATCH  | `/users/:UserId/block` | Admin                                        | `users`  |

2️⃣ Listing APIs (listingRouter)

| Feature                   | Method | Path                                   | Roles           | DB Table      |
| ------------------------- | ------ | -------------------------------------- | --------------- | ------------- |
| Create new listing        | POST   | `/listings`                            | Citizen, Dealer | `carlistings` |
| Update listing            | PATCH  | `/listings/:ListingId`                 | Owner, Admin    | `carlistings` |
| Delete listing            | DELETE | `/listings/:ListingId`                 | Owner, Admin    | `carlistings` |
| Get listing by ID         | GET    | `/listings/:ListingId`                 | All             | `carlistings` |
| Get listings with filters | GET    | `/listings?brand=&model=&city=&price=` | All             | `carlistings` |
| Get dealer listings       | GET    | `/listings/dealer/:DealerId`           | Admin, Dealer   | `carlistings` |

3️⃣ Car Brand & Model APIs (catalogRouter)

| Feature            | Method | Path                         | Roles | DB Table                 |
| ------------------ | ------ | ---------------------------- | ----- | ------------------------ |
| Get all brands     | GET    | `/brands`                    | All   | `carbrands`              |
| Get all models     | GET    | `/models`                    | All   | `carmodels`              |
| Add brand          | POST   | `/brands`                    | Admin | `carbrands`              |
| Add model          | POST   | `/models`                    | Admin | `carmodels`              |
| Update brand/model | PATCH  | `/brands/:id`, `/models/:id` | Admin | `carbrands`, `carmodels` |
| Delete brand/model | DELETE | `/brands/:id`, `/models/:id` | Admin | `carbrands`, `carmodels` |

4️⃣ Transaction APIs (transactionRouter)

| Feature                  | Method | Path                         | Roles           | DB Table       |
| ------------------------ | ------ | ---------------------------- | --------------- | -------------- |
| Purchase car             | POST   | `/transactions`              | Citizen, Dealer | `transactions` |
| Get own transactions     | GET    | `/transactions/me`           | All             | `transactions` |
| Get all transactions     | GET    | `/transactions`              | Admin           | `transactions` |
| Get transactions by user | GET    | `/transactions/user/:UserId` | Admin           | `transactions` |

5️⃣ Wishlist APIs (wishlistRouter)

| Feature                      | Method | Path                   | Roles           | DB Table   |
| ---------------------------- | ------ | ---------------------- | --------------- | ---------- |
| Add listing to wishlist      | POST   | `/wishlist`            | Citizen, Dealer | `wishlist` |
| Remove listing from wishlist | DELETE | `/wishlist/:ListingId` | Citizen, Dealer | `wishlist` |
| Get own wishlist             | GET    | `/wishlist`            | Citizen, Dealer | `wishlist` |

6️⃣ Review APIs (reviewRouter)
| Feature            | Method | Path                        | Roles           | DB Table        |
| ------------------ | ------ | --------------------------- | --------------- | --------------- |
| Post car review    | POST   | `/reviews/car`              | Citizen, Dealer | `carreviews`    |
| Post seller review | POST   | `/reviews/seller`           | Citizen, Dealer | `sellerreviews` |
| Get car reviews    | GET    | `/reviews/car/:ListingId`   | All             | `carreviews`    |
| Get seller reviews | GET    | `/reviews/seller/:SellerId` | All             | `sellerreviews` |

7️⃣ Seller Verification APIs (verificationRouter)

| Feature                     | Method | Path                            | Roles                  | DB Table             |
| --------------------------- | ------ | ------------------------------- | ---------------------- | -------------------- |
| Get pending verifications   | GET    | `/seller-verifications/pending` | Admin, Verifier        | `sellerverification` |
| Approve/Reject verification | PATCH  | `/seller-verifications/:id`     | Admin, Verifier        | `sellerverification` |
| Get verification status     | GET    | `/seller-verifications/:UserId` | Owner, Admin, Verifier | `sellerverification` |

8️⃣ Fraud & Reports APIs (fraudRouter & reportRouter)

| Feature              | Method | Path                        | Roles           | DB Table      |
| -------------------- | ------ | --------------------------- | --------------- | ------------- |
| Get all fraud alerts | GET    | `/fraud-alerts`             | Admin, Verifier | `fraudalerts` |
| Resolve fraud alert  | PATCH  | `/fraud-alerts/:id/resolve` | Admin, Verifier | `fraudalerts` |
| Create report        | POST   | `/reports`                  | Admin           | `reports`     |
| Get reports          | GET    | `/reports`                  | Admin           | `reports`     |

9️⃣ Location APIs (locationRouter)

| Feature                    | Method | Path                            | Roles | DB Table    |
| -------------------------- | ------ | ------------------------------- | ----- | ----------- |
| Get all states             | GET    | `/locations/states`             | All   | `states`    |
| Get all districts in state | GET    | `/locations/districts/:StateId` | All   | `districts` |
| Get all cities in district | GET    | `/locations/cities/:DistrictId` | All   | `cities`    |

🔟Filter APIs 
