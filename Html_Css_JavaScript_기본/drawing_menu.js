var Menu={
    menus:['여유','조밀','가벼운간식','산책','카페'],
    draw_menu:function(){
        var i=0;
        while(i<this.menus.length){
            document.write('<li><a href="'+this.menus[i]+'.html">'+this.menus[i]+'</a></li>');
            i+=1;
        }
    }
}