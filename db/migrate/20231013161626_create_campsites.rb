class CreateCampsites < ActiveRecord::Migration[7.0]
  def change
    create_table :campsites do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.integer :acres, null: false
      t.integer :max_guests, null: false
      t.integer :daily_rates, null: false
      t.boolean :lodging, null: false
      t.boolean :rv, null: false
      t.boolean :tents, null: false
      t.text :amenities, array: true
      t.text :activities, array: true
      t.text :natural_features, array: true
      t.text :description, null: false
      t.timestamps
    end
    add_index :campsites, :name, unique: true
    add_index :campsites, :location, unique: true 
  end
end
