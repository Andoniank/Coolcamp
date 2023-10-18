# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'
require 'open-uri'

ApplicationRecord.transaction do 
    Faker::UniqueGenerator.clear

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Campsite.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('campsites')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      first_name: 'Demo', 
      last_name: 'Lition',
      email: 'demo@user.io', 
      password: 'password'
    )

    User.create!(
      first_name: 'Krikor', 
      last_name: 'Andonian',
      email: 'andoniank@gmail.com', 
      password: 'password'
    )
  
    puts "Creating Campsites..."
    20.times do
      Campsite.create!(
        name: Faker::Name.unique.name,
        location: Faker::Address.city,
        acres: rand(1..50),
        max_guests: rand(1..15),
        daily_rates: rand(50..500),
        lodging: Faker::Boolean.boolean,
        rv: Faker::Boolean.boolean,
        tents: Faker::Boolean.boolean,
        amenities: [Faker::House.furniture, Faker::House.furniture, Faker::House.furniture],
        activities: [Faker::Verb.base, Faker::Verb.past, Faker::Verb.ing_form],
        natural_features: [Faker::Mountain.name, Faker::Mountain.range, Faker::Mountain.name],
        description: Faker::Lorem.paragraph(sentence_count: 5)
      )
    end

    puts "Creating Reservations..."
    Reservation.create!(
      start_date: 2.days.from_now,
      end_date: 5.days.from_now,
      user_id: 2,
      campsite_id: 5
    )

    puts "Done!"
  end