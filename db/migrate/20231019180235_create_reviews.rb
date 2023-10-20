class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.boolean :recommend, null: false
      t.text :description, null: false
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.references :campsite, null: false, foreign_key: {to_table: :campsites}
      t.timestamps
    end
  end
end
