# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Tony", password:"greentea", email: "tonyjlum@gmail.com")

Transaction.create(ticker_symbol: "TEST", stock_price: 33.91, shares: 11, user_id: 1)
Transaction.create(ticker_symbol: "REST", stock_price: 9.91, shares: 40, user_id: 1)
