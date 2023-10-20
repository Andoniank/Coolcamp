# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'
require 'open-uri'


puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
User.destroy_all
Campsite.destroy_all
Reservation.destroy_all


puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('campsites')
ApplicationRecord.connection.reset_pk_sequence!('reservations')







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

campsites = [
  {
    name: "Alpine Meadows",
    location: "Boulder, Colorado",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true, 
    rv: false,
    tents: true,
    amenities: ["Campfires allowed", "Toilets Available", "Wifi available", "Pets allowed", "Cooking equipment present"].sample(5),
    activities: ["Biking", "Hiking", "Climbing", "Swimming", "Fishing"].sample(5),
    natural_features: ["Mountains", "River", "Forest"].sample(3),
    description: "Alpine Meadows is a scenic retreat located in Boulder, Colorado. With mountain views and river access, it's an ideal spot for biking and hiking enthusiasts. Campfires are allowed, and pets are welcome. Whether you're tenting or looking for lodging, this campsite has got you covered.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-1.jpg'
  },{
    name: "Desert Oasis",
    location: "Phoenix, Arizona",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: true,
    tents: true,
    amenities: ["Campfires allowed", "Bins available", "Wifi available", "Pets allowed"].sample(4),
    activities: ["Off-roading (OHV)", "Climbing", "Wildlife watching", "Hiking"].sample(4),
    natural_features: ["Desert", "Canyon"].sample(2),
    description: "Desert Oasis is a sun-kissed escape located in Phoenix, Arizona. Explore the vast desert landscapes, climb rugged canyons, or enjoy some off-roading adventures. With wifi available and pet-friendly policies, it's a unique spot to unwind.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/rv-5.jpg'
  },{
    name: "Lakeside Retreat",
    location: "Tahoe, California",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: true,
    tents: true,
    amenities: ["Showers available", "Toilets Available", "Bins available", "Cooking equipment present"].sample(4),
    activities: ["Biking", "Swimming", "Fishing", "Hiking"].sample(4),
    natural_features: ["Lake", "Mountains", "Forest"].sample(3),
    description: "Lakeside Retreat offers a serene setting in Tahoe, California. Nestled between majestic mountains and a pristine lake, this campsite is perfect for water sports and biking trails. Modern amenities ensure a comfortable stay.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/tent-1.jpg'
  },{
    name: "Beachside Haven",
    location: "Miami, Florida",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: false,
    tents: true,
    amenities: ["Wifi available", "Showers available", "Toilets Available", "Pets allowed"].sample(4),
    activities: ["Swimming", "Biking", "Wildlife watching"].sample(3),
    natural_features: ["Beach", "Ocean"].sample(2),
    description: "Beachside Haven is a tropical paradise located in Miami, Florida. Feel the ocean breeze as you camp right on the beach. With modern amenities and a pet-friendly policy, it's an idyllic coastal getaway.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-2.jpg'
  },{
    name: "Forest Glade",
    location: "Portland, Oregon",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: false,
    tents: true,
    amenities: ["Toilets Available", "Campfires allowed", "Pets allowed", "Cooking equipment present"].sample(4),
    activities: ["Hiking", "Wildlife watching", "Biking", "Climbing"].sample(4),
    natural_features: ["Forest", "River", "Mountains"].sample(3),
    description: "Forest Glade is a tranquil spot nestled amidst tall trees in Portland, Oregon. The campsite is surrounded by lush forest trails, making it a haven for hikers and nature enthusiasts. Pets are welcome, and campfires add to the cozy atmosphere.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/tent-2.jpg'
  },{
    name: "Canyon Vista",
    location: "Moab, Utah",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: true,
    tents: true,
    amenities: ["Wifi available", "Toilets Available", "Bins available"].sample(3),
    activities: ["Off-roading (OHV)", "Climbing", "Hiking", "Biking"].sample(4),
    natural_features: ["Canyon", "Desert", "Mountains"].sample(3),
    description: "Canyon Vista, located in Moab, Utah, offers breathtaking views of majestic canyons. A popular spot for off-roading and climbing, this campsite also provides all the basic amenities to make your stay comfortable.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/tent-4.jpg'
  },{
    name: "River's Edge",
    location: "Boise, Idaho",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: true,
    tents: false,
    amenities: ["Showers available", "Toilets Available", "Pets allowed", "Cooking equipment present"].sample(4),
    activities: ["Fishing", "Swimming", "Hiking", "Wildlife watching"].sample(4),
    natural_features: ["River", "Forest", "Field"].sample(3),
    description: "Situated in Boise, Idaho, River's Edge offers an idyllic setting right by a calm river. It's perfect for those looking to fish or simply relax by the water. The campsite also boasts of lush green fields and dense forests.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/rv-4.jpg'
  },{
    name: "Mountain Peak",
    location: "Denver, Colorado",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: false,
    tents: true,
    amenities: ["Wifi available", "Bins available", "Campfires allowed", "Toilets Available"].sample(4),
    activities: ["Hiking", "Climbing", "Biking", "Wildlife watching"].sample(4),
    natural_features: ["Mountains", "Forest", "River"].sample(3),
    description: "Mountain Peak, set in Denver, Colorado, promises adventure at every corner. Surrounded by towering mountains, it's a trekker's paradise. The nearby river adds to its charm, making it a preferred spot for nature lovers.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-4.jpg'
  },{
    name: "Beach Breeze",
    location: "San Diego, California",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: true,
    tents: true,
    amenities: ["Showers available", "Toilets Available", "Pets allowed", "Wifi available"].sample(4),
    activities: ["Swimming", "Biking", "Wildlife watching", "Fishing"].sample(4),
    natural_features: ["Beach", "Ocean", "Field"].sample(3),
    description: "Experience coastal vibes at Beach Breeze in San Diego, California. Whether you're looking to surf or simply bask under the sun, this campsite is perfect. With wifi and modern amenities, it combines nature with convenience.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/tent-3.jpg'
  },{
    name: "Prairie Fields",
    location: "Lincoln, Nebraska",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: true,
    tents: false,
    amenities: ["Wifi available", "Toilets Available", "Pets allowed", "Bins available"].sample(4),
    activities: ["Hiking", "Wildlife watching", "Biking", "Horseback riding"].sample(4),
    natural_features: ["Field", "Forest", "River"].sample(3),
    description: "Prairie Fields offers a touch of the heartland in Lincoln, Nebraska. Wander through open fields or take a bike ride alongside the forest and river. With modern amenities and horseback riding options, it's a unique spot to relax.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/rv-6.jpg'
  },
  {
    name: "Oceanic Pines",
    location: "Portland, Maine",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: false,
    tents: true,
    amenities: ["Showers available", "Toilets Available", "Campfires allowed", "Pets allowed"].sample(4),
    activities: ["Swimming", "Fishing", "Wildlife watching", "Biking"].sample(4),
    natural_features: ["Beach", "Forest", "Ocean"].sample(3),
    description: "Situated on the eastern seaboard in Portland, Maine, Oceanic Pines is a beautiful blend of forested areas and beachfront. Dive into the ocean, go fishing or simply set up camp amidst the pines.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-5.jpg'
  },
  {
    name: "Bayou Bliss",
    location: "New Orleans, Louisiana",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: true,
    tents: true,
    amenities: ["Wifi available", "Toilets Available", "Showers available", "Cooking equipment present"].sample(4),
    activities: ["Swimming", "Fishing", "Hiking", "Wildlife watching"].sample(4),
    natural_features: ["River", "Swamp", "Forest"].sample(3),
    description: "Bayou Bliss in New Orleans, Louisiana, offers a distinct bayou experience. Enjoy the unique swamp landscapes, go fishing or simply explore the dense forest trails.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-6.jpg'
  },
  {
    name: "Highland Horizons",
    location: "Aspen, Colorado",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: true,
    tents: true,
    amenities: ["Campfires allowed", "Bins available", "Pets allowed", "Toilets Available"].sample(4),
    activities: ["Skiing", "Hiking", "Climbing", "Biking"].sample(4),
    natural_features: ["Mountains", "Lake", "Forest"].sample(3),
    description: "Highland Horizons in Aspen, Colorado, offers breathtaking mountain vistas and lakeside views. Perfect for skiing in the winter and hiking in the summer, it promises an adventurous stay.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/tent-5.jpg'
  },
  {
    name: "Bison Plains",
    location: "Fargo, North Dakota",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: false,
    tents: true,
    amenities: ["Wifi available", "Toilets Available", "Pets allowed", "Bins available"].sample(4),
    activities: ["Wildlife watching", "Hiking", "Biking", "Horseback riding"].sample(4),
    natural_features: ["Field", "Forest", "River"].sample(3),
    description: "Bison Plains near Fargo, North Dakota, is a testament to the vast plains of the Midwest. Experience wild bison sightings, enjoy horseback rides, or simply take in the natural beauty of the fields.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/tent-6.jpg'
  },
  {
    name: "Red Rock Range",
    location: "Las Vegas, Nevada",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: true,
    tents: true,
    amenities: ["Campfires allowed", "Toilets Available", "Showers available", "Cooking equipment present"].sample(4),
    activities: ["Climbing", "Hiking", "Off-roading (OHV)", "Biking"].sample(4),
    natural_features: ["Desert", "Mountains", "Canyon"].sample(3),
    description: "Just a short drive from Las Vegas, Nevada, Red Rock Range offers a stark contrast to city life. Explore the captivating red rock formations, go off-roading or simply enjoy a serene desert evening.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/rv-2.jpg'
  },
  {
    name: "Lone Star Lodge",
    location: "Dallas, Texas",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: false,
    tents: true,
    amenities: ["Showers available", "Wifi available", "Pets allowed", "Toilets Available"].sample(4),
    activities: ["Hiking", "Biking", "Horseback riding", "Wildlife watching"].sample(4),
    natural_features: ["Field", "Forest", "River"].sample(3),
    description: "In the heart of Texas, Lone Star Lodge near Dallas offers a mix of modern comforts and rustic charm. Wander through forested trails, or enjoy a day of horseback riding in the vast open fields.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-3.jpg'
  },
  {
    name: "Sapphire Shores",
    location: "Fort Lauderdale, Florida",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: false,
    tents: true,
    amenities: ["Wifi available", "Showers available", "Campfires allowed", "Pets allowed"].sample(4),
    activities: ["Swimming", "Fishing", "Biking", "Wildlife watching"].sample(4),
    natural_features: ["Beach", "Ocean", "Forest"].sample(3),
    description: "Sapphire Shores in Fort Lauderdale, Florida, offers pristine beachfront and tropical vibes. Dive into the ocean, lounge by the beach or explore the neighboring forests. It's truly a paradise for beach lovers.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-7.jpg'
  },
  {
    name: "Serene Meadows",
    location: "Anchorage, Alaska",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: true,
    tents: true,
    amenities: ["Campfires allowed", "Toilets Available", "Pets allowed", "Bins available"].sample(4),
    activities: ["Wildlife watching", "Hiking", "Fishing", "Climbing"].sample(4),
    natural_features: ["Mountains", "Lake", "Forest"].sample(3),
    description: "Experience the wild beauty of Anchorage, Alaska at Serene Meadows. With stunning mountain views, opportunities to spot unique wildlife, and pristine lakes, it's a haven for nature lovers.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/rv-3.jpg'
  },
  {
    name: "Sunset Sands",
    location: "Tucson, Arizona",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: true,
    rv: true,
    tents: true,
    amenities: ["Showers available", "Wifi available", "Toilets Available", "Cooking equipment present"].sample(4),
    activities: ["Off-roading (OHV)", "Hiking", "Biking", "Wildlife watching"].sample(4),
    natural_features: ["Desert", "Mountains", "Canyon"].sample(3),
    description: "Sunset Sands near Tucson, Arizona, promises dramatic desert landscapes. Watch the sun set over the dunes, go off-roading or explore the mystique of the canyons. With modern amenities, it's an adventurer's delight.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/lodging-8.jpg'
  },{
    name: "Mystic Grove",
    location: "Salem, Oregon",
    acres: rand(1..30),
    max_guests: rand(1..15),
    daily_rates: rand(50..300),
    lodging: false,
    rv: true,
    tents: true,
    amenities: ["Campfires allowed", "Bins available", "Pets allowed", "Wifi available", "Cooking equipment present"].sample(5),
    activities: ["Hiking", "Wildlife watching", "Biking", "Climbing"].sample(4),
    natural_features: ["Forest", "River", "Lake", "Field"].sample(4),
    description: "Mystic Grove near Salem, Oregon, is a serene retreat nestled amidst dense forests and calming water bodies. Dive into the lake, explore the expansive fields, or simply set up camp by the riverside. With plentiful amenities and activities, it's a camper's dream come true.",
    photo_url: 'https://coolcamp-seeds.s3.us-west-1.amazonaws.com/rv-1.jpg'
  }]


  campsites.each do |campsite_data|
    campsite = Campsite.create!(
      name: campsite_data[:name],
      location: campsite_data[:location],
      acres: campsite_data[:acres],
      max_guests: campsite_data[:max_guests],
      daily_rates: campsite_data[:daily_rates],
      lodging: campsite_data[:lodging],
      rv: campsite_data[:rv],
      tents: campsite_data[:tents],
      amenities: campsite_data[:amenities],
      activities: campsite_data[:activities],
      natural_features: campsite_data[:natural_features],
      description: campsite_data[:description]
    )

    campsite.photo.attach(
        io: URI.open(campsite_data[:photo_url]),
        filename: File.basename(URI.parse(campsite_data[:photo_url]).path)
    ) if campsite_data[:photo_url]
  end

      
  puts "Creating Reservations..."
  Reservation.create!(
    start_date: 2.days.from_now,
    end_date: 5.days.from_now,
    user_id: 2,
    campsite_id: 5
  )


  puts "Creating Reviews"
  Review.create!(
    recommend: true,
    description: 'I love this campsite, its my favorite!',
    user_id: 2,
    campsite_id: 1
  )

  Review.create!( 
    recommend: false,
    description: 'This campsite smells like butt',
    user_id: 1,
    campsite_id: 2
  )

  puts "Done!"


