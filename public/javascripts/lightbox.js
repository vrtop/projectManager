function grayOut(vis, options) {
  // Pass true to gray out screen, false to ungray
  // options are optional.  This is a JSON object with the following (optional) properties
  // opacity:0-100         // Lower number = less grayout higher = more of a blackout
  // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
  // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
  // grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
  // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
  // in any order.  Pass only the properties you need to set.
  var options = options || {};
  var zindex = options.zindex || 50;
  var opacity = options.opacity || 70;
  var opaque = (opacity / 100);
  var bgcolor = options.bgcolor || '#000000';
  var dark=document.getElementById('darkenScreenObject');
  if (!dark) {
    // The dark layer doesn't exist, it's never been created.  So we'll
    // create it here and apply some basic styles.
    // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
    var tbody = document.getElementsByTagName("body")[0];
    var tnode = document.createElement('div');           // Create the layer.
        tnode.style.position='absolute';                 // Position absolutely, WRONG! it should have been fixed positioning
        tnode.style.top='0px';                           // In the top
        tnode.style.left='0px';                          // Left corner of the page
        tnode.style.overflow='hidden';                   // Try to avoid making scroll bars
        tnode.style.display='none';                      // Start out Hidden
        tnode.id='darkenScreenObject';                   // Name it so we can find it later
    tbody.appendChild(tnode);                            // Add it to the web page
    dark=document.getElementById('darkenScreenObject');  // Get the object.
  }
  if (vis) {
    var pageWidth='100%';
    var pageHeight='100%';
    //set the shader to cover the entire page and make it visible.
    dark.style.opacity=opaque;
    dark.style.MozOpacity=opaque;
    dark.style.filter='alpha(opacity='+opacity+')';
    dark.style.zIndex=zindex;
    dark.style.backgroundColor=bgcolor;
    dark.style.width= pageWidth;
    dark.style.height= pageHeight;
    dark.style.display='';
  } else {
     dark.style.display='none';
  }
}

function LightBoxIterator(){
    this.currentBox = 0;
    this.boxCount = 0;
    this.boxes = [];
    this.pushBox = pushBox;
    this.popBox = popBox;
    this.main = "#lightboxContent";
    this.container = "#lightboxContainer";
    this.errors = "#lightboxErrors";
    this.incrementBoxCount = incrementBoxCount;
    this.decrementBoxCount = decrementBoxCount;
    this.hidePreviousBox = hidePreviousBox;
    this.displayPreviousBox = displayPreviousBox;
}

var lightBoxIterator = new LightBoxIterator();

function addNewLightBox(content)
{
    var new_lightbox = document.createElement('div');
    new_lightbox.setAttribute("class", "lightbox");
    new_lightbox.innerHTML = content;
    lightBoxIterator.pushBox(new_lightbox);
    $(lightBoxIterator.container).css("display", "");
    $(lightBoxIterator.main).css("display", "");
    $(lightBoxIterator.errors).css("display", "none");
    grayOut(true);
}

function closeOldLightbox(gray)
{
    lightBoxIterator.popBox(gray);
    $(lightBoxIterator.errors).css('display','none');
}

function pushBox(new_box)
{
    this.boxes.push(new_box);
    this.hidePreviousBox();
    $(this.main).append(new_box);
    this.incrementBoxCount();
}

function popBox(gray)
{
    this.boxes[this.boxCount -1].parentNode.removeChild(this.boxes[this.boxCount-1]);
    this.decrementBoxCount();
    this.displayPreviousBox();
    if(this.boxCount == 0 && !gray)
    {
        grayOut(false);
    }
}

function decrementBoxCount()
{
    this.boxCount--;
    this.boxes.pop();
}

function incrementBoxCount()
{
    this.boxCount++;
}

function hidePreviousBox()
{
    if(this.boxCount > 0){
        this.boxes[this.boxCount - 1].style.display = 'none';
    }
}

function displayPreviousBox()
{
    if(this.boxCount > 0)
        this.boxes[this.boxCount -1].style.display = '';
}