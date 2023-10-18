json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :created_at, :updated_at
end

json.reservations do
    @user.reservations.includes(:campsite).each do |reservation|
        json.set! reservation.id do
            json.extract! reservation, :id, :start_date, :end_date, :user_id, :campsite_id
            json.campsite_name reservation.campsite.name
        end
    end
end