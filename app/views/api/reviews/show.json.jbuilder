json.review do
    json.extract! @review, :id, :recommend, :description, :user_id, :campsite_id, :created_at, :updated_at
end