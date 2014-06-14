get '/' do
  @surveys = Survey.all
  @user_surveys = Survey.where(user_id: session[:user_id])
  erb :home
end

post '/signin' do
  @user = User.where(email:params[:email]).first
  @user.authenticate(params[:password])
  session[:user_id] = @user.id
  @name = @user.name.capitalize
  content_type :JSON
  {name:@name}.to_json
end

post '/signup' do
  @user = User.new(name:params[:name], email: params[:email], password:params[:password])
  if @user.save
    session[:user_id] = @user.id
    @name = @user.name.capitalize
    content_type :JSON
    {name:@name}.to_json
  else
    404
  end
end

get '/isLoggedIn' do
  if session[:user_id]
    isLoggedIn = true
    name = User.find(session[:user_id]).name
  else
    isLoggedIn = false
  end
  content_type :JSON
  {isLoggedIn:isLoggedIn, name:name}.to_json
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


