json.campsite do
    json.extract! @campsite, :id, :name, :location, :acres, :max_guests, :daily_rates, :lodging, :rv, :tents, :amenities, :activities, :natural_features, :description, :created_at, :updated_at
    json.photo_url @campsite.photo.attached? ? @campsite.photo.url : nil
end

reviews = @campsite.reviews.includes(:user)
json.reviews do
    reviews.each do |review|
        json.set! review.id do
            json.id review.id
            json.recommend review.recommend
            json.description review.description
            json.user_id review.user_id
            json.campsite_id review.campsite_id
            
            
            json.user_first_name review.user.first_name
            json.user_last_name review.user.last_name
        end
    end
end