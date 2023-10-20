# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  recommend   :boolean          not null
#  description :text             not null
#  user_id     :bigint           not null
#  campsite_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :campsite,
        foreign_key: :campsite_id,
        class_name: :Campsite
end
