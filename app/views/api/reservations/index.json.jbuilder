@reservations.each do |reservation|
    json.set! reservation.id do 
        json.extract! reservation, :id, :user_id, :campsite_id
    end
end