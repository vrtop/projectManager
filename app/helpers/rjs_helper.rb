module RjsHelper

  def display_lightbox(partial)
    content = render :partial=>partial
    page << "addNewLightBox(#{content.to_json})"
  end

end