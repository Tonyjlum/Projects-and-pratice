class V1::LoginsController < ApplicationController

  def index
    @users = User.all
    render json: {dmk: "fsdfsd"}
  end

end
