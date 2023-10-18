class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.references :campsite, null: false, foreign_key:  {to_table: :campsites}
      t.timestamps
    end
  end
end
