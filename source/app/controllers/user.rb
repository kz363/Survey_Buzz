get '/' do
  @surveys = Survey.all
  @user_surveys = Survey.where(id: session[:user_id])
  erb :home
end

post '/signin' do
  @user = User.where(email:params[:email]).first
  @user.authenticate(params[:password])
  session[:user_id] = @user.id
  session[:user_name] = @user.name
  @name = @user.name
  content_type :JSON
  {name:@name}.to_json
end

post '/signup' do
  @user = User.new(name:params[:name], email: params[:email], password:params[:password])
  if @user.save
    session[:user_id] = @user.id
    session[:user_name] = @user.name
    @name = @user.name
    content_type :JSON
    {name:@name}.to_json
  else
    404
  end
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


