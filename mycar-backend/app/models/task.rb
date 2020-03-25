class Task < ApplicationRecord
    belongs_to :car
    has_many :notes, dependent: :delete_all
    validates :issue, presence: true
    accepts_nested_attributes_for :notes, :allow_destroy => true
end
    