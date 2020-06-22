class MessagesController < ApplicationController
  before_action :set_up
  def index
      @message = Message.new
      @messages = @group.messages.includes(:user)
      @groups = current_user.groups
  end

  def create
      @message = @group.messages.new(messages_params)
      if @message.save
        respond_to do |format|
          format.json
        end
      else
        @messages = @group.messages.includes(:user)
        flash.now[:alert] = 'メッセージを入力してください'
        render :index
      end
  end

  private
  def messages_params
      params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_up
    @group = Group.find(params[:group_id])
  end
end
