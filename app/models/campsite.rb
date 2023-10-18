# == Schema Information
#
# Table name: campsites
#
#  id               :bigint           not null, primary key
#  name             :string           not null
#  location         :string           not null
#  acres            :integer          not null
#  max_guests       :integer          not null
#  daily_rates      :integer          not null
#  lodging          :boolean          not null
#  rv               :boolean          not null
#  tents            :boolean          not null
#  amenities        :text             is an Array
#  activities       :text             is an Array
#  natural_features :text             is an Array
#  description      :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Campsite < ApplicationRecord
    validates :name, uniqueness: true, presence: true
    validates :location, uniqueness: true, presence: true
    validates :acres, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validates :max_guests, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validates :daily_rates, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validates :lodging, inclusion: {in: [true, false]}
    validates :rv, inclusion: {in: [true, false]}
    validates :tents, inclusion: {in: [true, false]}
    validates :description, presence: true


    has_many :reservations,
        foreign_key: :campsite_id,
        class_name: :Reservation,
        dependent: :destroy
end
