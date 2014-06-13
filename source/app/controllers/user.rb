get '/' do
  @surveys = Survey.all
  @user_surveys = Survey.where(id:session[:user_id])
  erb :home
end

post '/signin' do
  @user = User.where(email:params[:email])
  @user.authenticate(params[:password])
  session[:user_id] = @user.id
  @name = @user.name
  content_type :JSON
  (@name).to_json
end

post '/signup' do
  @user = User.create(name:params[:name], email: params[:email], password_hash:params[:password])
  session[:user_id] = @user.id
  @name = @user.name
  content_type :JSON
  (@name).to_json
end

# get '/user/surveys' do
#   @user_surveys = Survey.find_by_id(session[:user_id])
# end

# get '/surveys' do
#   @surveys = Survey.all
# end

get '/signout' do
  session.clear
end


