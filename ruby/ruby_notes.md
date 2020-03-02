## Print to console
`puts "string"` - adds new line

`print "string"` - doesn't add new line

---

## Declaring functions
```ruby
def func_name

end
```

---

## Declaring variables
`name_of_var = some_value`

`@article`
- `@` implies instance variable, all instance variables are passed to the view
- instance variables can be used in the view as `@variable.field`

---

## Accessing fields in a hash (object)
`obj[:field_name]`

---

## Rails routes
`root 'page_name#action'` - to define the root of the app

`get 'page_name/action'` - defines get route for page_name

`resources :resource_name` - will create CRUD routes for the resource described

---

## Controller generation
`rails generate controller name action`
- will create a controller with name and the specified action
- action is just a function inside the controller that's responsible for running when a route is called
    - `welcome#index` -> index function inside welcome controller

---

## Generating a model
`rails generate model name field:type field2:type ...`
- generates a model with the plural of `name` - always use singular in generate command
- creates a model file under `models/` and a migration script under `db/migrate`
    - migration script used to create and modify databases, can be reversed
    - run migration with `rails db:migrate`
- model maps to a resource
- resource has built in helpers for routing
    - `resources_path` will be `/resources` <- Note the 's'
    - `new_resource_path` will be `/resources/new/` <- Note no 's'
    - `resource_path(resource)` will be `/resources/:resource_id/`

