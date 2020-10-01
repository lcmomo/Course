cc.game.onStart = function(){
    //cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(360, 480, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MyScene());
    }, this);
};
//cc.game.run();
cc.game.run("gameCanvas");