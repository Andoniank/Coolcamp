json.reservation do
    json.extract! @reservation, :id, :start_date, :end_date, :user_id, :campsite_id, :created_at, :updated_at
end