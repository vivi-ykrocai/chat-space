# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :massages
- has_many :groups_users
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
### Association
- has_many :massages
- has_many :groups_user
- has_many :users, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user