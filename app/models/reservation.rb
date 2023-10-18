# == Schema Information
#
# Table name: reservations
#
#  id          :bigint           not null, primary key
#  start_date  :datetime         not null
#  end_date    :datetime         not null
#  user_id     :bigint           not null
#  campsite_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Reservation < ApplicationRecord
    
    
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :campsite,
        foreign_key: :campsite_id,
        class_name: :Campsite


end
