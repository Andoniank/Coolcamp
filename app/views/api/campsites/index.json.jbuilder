@campsites.each do |campsite|
    json.set! campsite.id do 
        json.extract! campsite, :id, :name, :location, :acres, :max_guests, :daily_rates, :lodging, :rv, :tents, :created_at, :updated_at 
    end
end

