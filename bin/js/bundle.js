var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameUI_1 = require("./script/GameUI");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("script/GameUI.ts", GameUI_1.default);
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/GameUI":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Main = /** @class */ (function () {
    function Main() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        Laya.stage.alignV = GameConfig_1.default.alignV;
        Laya.stage.alignH = GameConfig_1.default.alignH;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = false;
        Laya.Shader3D.debugMode = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        Laya.URL.basePath = "https://cdn.zzzgames.cn/flag/";
        //加载IDE指定的场景
        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
    };
    return Main;
}());
//激活启动类
new Main();
},{"./GameConfig":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CtmMat_Flag = /** @class */ (function (_super) {
    __extends(CtmMat_Flag, _super);
    function CtmMat_Flag() {
        var _this = _super.call(this) || this;
        _this.setShaderName("CtmMat_Flag");
        _this.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
        return _this;
    }
    Object.defineProperty(CtmMat_Flag.prototype, "MainTex", {
        set: function (value) {
            this._shaderValues.setTexture(CtmMat_Flag.MainTex, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtmMat_Flag.prototype, "Speed", {
        set: function (value) {
            this._shaderValues.setNumber(CtmMat_Flag.Speed, value);
        },
        enumerable: true,
        configurable: true
    });
    CtmMat_Flag.MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
    CtmMat_Flag.Speed = Laya.Shader3D.propertyNameToID("u_Speed");
    return CtmMat_Flag;
}(Laya.BlinnPhongMaterial));
exports.CtmMat_Flag = CtmMat_Flag;
var CtmSha_Flag = /** @class */ (function () {
    function CtmSha_Flag() {
    }
    CtmSha_Flag.prototype.init = function () {
        var attributeMap = {
            "a_Position": Laya.VertexMesh.MESH_POSITION0,
            "a_Normal": Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            'a_BoneWeights': Laya.VertexMesh.MESH_BLENDWEIGHT0,
            'a_BoneIndices': Laya.VertexMesh.MESH_BLENDINDICES0
        };
        var uniformMap = {
            'u_Bones': Laya.Shader3D.PERIOD_CUSTOM,
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_Color': Laya.Shader3D.PERIOD_MATERIAL,
            'u_LineWidth': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Time': Laya.Shader3D.PERIOD_SCENE,
            'u_Speed': Laya.Shader3D.PERIOD_MATERIAL,
            'u_MainTex': Laya.Shader3D.PERIOD_MATERIAL,
        };
        var stateMap = {
            's_Cull': Laya.Shader3D.RENDER_STATE_CULL,
            's_Blend': Laya.Shader3D.RENDER_STATE_BLEND,
            's_BlendSrc': Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            's_BlendDst': Laya.Shader3D.RENDER_STATE_BLEND_DST,
            's_DepthTest': Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            's_DepthWrite': Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };
        var vs = "\n        #include \"Lighting.glsl\";\n        attribute vec4 a_Position;\n        attribute vec2 a_Texcoord0;\n        attribute vec3 a_Normal;\n        uniform mat4 u_MvpMatrix;\n        uniform mat4 u_WorldMat;\n        varying vec2 v_Texcoord0;\n        varying vec3 v_Normal;\n        uniform float u_Time;\n        uniform float u_Speed;\n\n        #ifdef BONE\n        attribute vec4 a_BoneIndices;\n        attribute vec4 a_BoneWeights;\n        const int c_MaxBoneCount = 24;\n        uniform mat4 u_Bones[c_MaxBoneCount];\n        #endif\n\n        void main()\n        {\n            v_Texcoord0 = a_Texcoord0;\n            vec4 pos = a_Position;\n            float x = (a_Position.x + 5.0)/10.0;\n            pos.y += x * sin(pos.x + u_Time * u_Speed);\n            pos.y += x * sin(pos.z + u_Time * u_Speed);\n            gl_Position=u_MvpMatrix * pos;\n        }\n        ";
        var ps = "\n        #ifdef FSHIGHPRECISION\n        precision highp float;\n        #else\n        precision mediump float;\n        #endif\n        uniform vec4 u_Color;\n        uniform sampler2D u_MainTex;\n        varying vec2 v_Texcoord0;\n\n        void main()\n        {\n            gl_FragColor = texture2D(u_MainTex,vec2(v_Texcoord0.x,1.0-v_Texcoord0.y));\n        }\n        ";
        var customShader = Laya.Shader3D.add("CtmMat_Flag");
        var subShader = new Laya.SubShader(attributeMap, uniformMap, Laya.SkinnedMeshSprite3D.shaderDefines, Laya.BlinnPhongMaterial.shaderDefines);
        customShader.addSubShader(subShader);
        subShader.addShaderPass(vs, ps, stateMap);
    };
    return CtmSha_Flag;
}());
exports.CtmSha_Flag = CtmSha_Flag;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./../ui/layaMaxUI");
var CtmMat_Flag_1 = require("./CtmMat_Flag");
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        new CtmMat_Flag_1.CtmSha_Flag().init();
        var cus;
        Laya.Scene3D.load("res/LayaScene_Car_Tocus/Conventional/Car_Tocus.ls", Laya.Handler.create(_this, function (res) {
            Laya.stage.addChildAt(res, 0);
            cus = new CtmMat_Flag_1.CtmMat_Flag();
            Laya.Texture2D.load("res/LayaScene_Car_Tocus/Conventional/Assets/Textures/nationalFlag.jpg", Laya.Handler.create(_this, function (tex) {
                cus.MainTex = tex;
            }));
            cus.Speed = _this.slider.value;
            var model = res.getChildByName("GameObject").getChildByName("Plane");
            model.meshRenderer.material = cus;
        }));
        _this.slider.changeHandler = Laya.Handler.create(_this, function () {
            cus.Speed = _this.slider.value;
            console.log(_this.slider.value);
        }, null, false);
        return _this;
    }
    return GameUI;
}(layaMaxUI_1.ui.test.TestSceneUI));
exports.default = GameUI;
},{"./../ui/layaMaxUI":5,"./CtmMat_Flag":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var TestSceneUI = /** @class */ (function (_super) {
            __extends(TestSceneUI, _super);
            function TestSceneUI() {
                return _super.call(this) || this;
            }
            TestSceneUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadScene("test/TestScene");
            };
            return TestSceneUI;
        }(Scene));
        test.TestSceneUI = TestSceneUI;
        REG("ui.test.TestSceneUI", TestSceneUI);
    })(test = ui.test || (ui.test = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6L+WuieijheWMhS9MYXlhQWlySURFL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL01haW4udHMiLCJzcmMvc2NyaXB0L0N0bU1hdF9GbGFnLnRzIiwic3JjL3NjcmlwdC9HYW1lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLGdHQUFnRztBQUNoRywwQ0FBb0M7QUFDcEM7O0VBRUU7QUFDRjtJQWFJO0lBQWMsQ0FBQztJQUNSLGVBQUksR0FBWDtRQUNJLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxnQkFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWhCTSxnQkFBSyxHQUFRLEdBQUcsQ0FBQztJQUNqQixpQkFBTSxHQUFRLElBQUksQ0FBQztJQUNuQixvQkFBUyxHQUFRLFlBQVksQ0FBQztJQUM5QixxQkFBVSxHQUFRLE1BQU0sQ0FBQztJQUN6QixpQkFBTSxHQUFRLEtBQUssQ0FBQztJQUNwQixpQkFBTSxHQUFRLE1BQU0sQ0FBQztJQUNyQixxQkFBVSxHQUFLLHNCQUFzQixDQUFDO0lBQ3RDLG9CQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3BCLGdCQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3BCLGVBQUksR0FBUyxLQUFLLENBQUM7SUFDbkIsdUJBQVksR0FBUyxLQUFLLENBQUM7SUFDM0IsNEJBQWlCLEdBQVMsSUFBSSxDQUFDO0lBTTFDLGlCQUFDO0NBbEJELEFBa0JDLElBQUE7a0JBbEJvQixVQUFVO0FBbUIvQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUN4QmxCLDJDQUFzQztBQUN0QztJQUVDO1FBRUMs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LENBQUM7O0lBQ3JCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0E3QkEsQUE2QkMsQ0E3Qm1DLGNBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQTZCdEQ7Ozs7O0FDakNELElBQU8sS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBYyxFQUFFLENBVWY7QUFWRCxXQUFjLEVBQUU7SUFBQyxJQUFBLElBQUksQ0FVcEI7SUFWZ0IsV0FBQSxJQUFJO1FBQ2pCO1lBQWlDLCtCQUFLO1lBRWxDO3VCQUFlLGlCQUFPO1lBQUEsQ0FBQztZQUN2QixvQ0FBYyxHQUFkO2dCQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNMLGtCQUFDO1FBQUQsQ0FQQSxBQU9DLENBUGdDLEtBQUssR0FPckM7UUFQWSxnQkFBVyxjQU92QixDQUFBO1FBQ0QsR0FBRyxDQUFDLHFCQUFxQixFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUMsRUFWZ0IsSUFBSSxHQUFKLE9BQUksS0FBSixPQUFJLFFBVXBCO0FBQUQsQ0FBQyxFQVZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQVVmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuL3NjcmlwdC9HYW1lVUlcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NjQwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTEzNjtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwibm9uZVwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwidGVzdC9UZXN0U2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9HYW1lVUkudHNcIixHYW1lVUkpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuY2xhc3MgTWFpblxyXG57XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKCB3aW5kb3dbIFwiTGF5YTNEXCIgXSApIExheWEzRC5pbml0KCBHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCApO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoIEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhWyBcIldlYkdMXCIgXSApO1xyXG5cdFx0TGF5YVsgXCJQaHlzaWNzXCIgXSAmJiBMYXlhWyBcIlBoeXNpY3NcIiBdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVsgXCJEZWJ1Z1BhbmVsXCIgXSAmJiBMYXlhWyBcIkRlYnVnUGFuZWxcIiBdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25WID0gR2FtZUNvbmZpZy5hbGlnblY7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IEdhbWVDb25maWcuYWxpZ25IO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKCBHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoIFwiZGVidWdcIiApID09IFwidHJ1ZVwiICkgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoIEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbIFwiUGh5c2ljc0RlYnVnRHJhd1wiIF0gKSBMYXlhWyBcIlBoeXNpY3NEZWJ1Z0RyYXdcIiBdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKCBHYW1lQ29uZmlnLnN0YXQgKSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gZmFsc2U7XHJcblx0XHRMYXlhLlNoYWRlcjNELmRlYnVnTW9kZSA9IHRydWU7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZSggXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSggdGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQgKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTiApO1xyXG5cdH1cclxuXHJcblx0b25WZXJzaW9uTG9hZGVkKCk6IHZvaWRcclxuXHR7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZSggXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSggdGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCApICk7XHJcblx0fVxyXG5cclxuXHRvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkXHJcblx0e1xyXG5cdFx0TGF5YS5VUkwuYmFzZVBhdGggPSBcImh0dHBzOi8vY2RuLnp6emdhbWVzLmNuL2ZsYWcvXCI7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbiggR2FtZUNvbmZpZy5zdGFydFNjZW5lICk7XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBjbGFzcyBDdG1NYXRfRmxhZyBleHRlbmRzIExheWEuQmxpbm5QaG9uZ01hdGVyaWFsXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTWFpblRleDogbnVtYmVyID0gTGF5YS5TaGFkZXIzRC5wcm9wZXJ0eU5hbWVUb0lEKCBcInVfTWFpblRleFwiICk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNwZWVkOiBudW1iZXIgPSBMYXlhLlNoYWRlcjNELnByb3BlcnR5TmFtZVRvSUQoIFwidV9TcGVlZFwiICk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGFkZXJOYW1lKCBcIkN0bU1hdF9GbGFnXCIgKTtcclxuICAgICAgICB0aGlzLnJlbmRlck1vZGUgPSBMYXlhLkJsaW5uUGhvbmdNYXRlcmlhbC5SRU5ERVJNT0RFX09QQVFVRTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IE1haW5UZXgoIHZhbHVlOiBMYXlhLkJhc2VUZXh0dXJlIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9zaGFkZXJWYWx1ZXMuc2V0VGV4dHVyZSggQ3RtTWF0X0ZsYWcuTWFpblRleCwgdmFsdWUgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IFNwZWVkKCB2YWx1ZTogbnVtYmVyIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9zaGFkZXJWYWx1ZXMuc2V0TnVtYmVyKCBDdG1NYXRfRmxhZy5TcGVlZCwgdmFsdWUgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN0bVNoYV9GbGFnXHJcbntcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgYXR0cmlidXRlTWFwID0ge1xyXG4gICAgICAgICAgICBcImFfUG9zaXRpb25cIjogTGF5YS5WZXJ0ZXhNZXNoLk1FU0hfUE9TSVRJT04wLFxyXG4gICAgICAgICAgICBcImFfTm9ybWFsXCI6IExheWEuVmVydGV4TWVzaC5NRVNIX05PUk1BTDAsXHJcbiAgICAgICAgICAgICdhX1RleGNvb3JkMCc6IExheWEuVmVydGV4TWVzaC5NRVNIX1RFWFRVUkVDT09SRElOQVRFMCxcclxuICAgICAgICAgICAgJ2FfQm9uZVdlaWdodHMnOiBMYXlhLlZlcnRleE1lc2guTUVTSF9CTEVORFdFSUdIVDAsXHJcbiAgICAgICAgICAgICdhX0JvbmVJbmRpY2VzJzogTGF5YS5WZXJ0ZXhNZXNoLk1FU0hfQkxFTkRJTkRJQ0VTMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHVuaWZvcm1NYXAgPSB7XHJcbiAgICAgICAgICAgICd1X0JvbmVzJzogTGF5YS5TaGFkZXIzRC5QRVJJT0RfQ1VTVE9NLFxyXG4gICAgICAgICAgICAndV9NdnBNYXRyaXgnOiBMYXlhLlNoYWRlcjNELlBFUklPRF9TUFJJVEUsXHJcbiAgICAgICAgICAgICd1X1dvcmxkTWF0JzogTGF5YS5TaGFkZXIzRC5QRVJJT0RfU1BSSVRFLFxyXG4gICAgICAgICAgICAndV9Db2xvcic6IExheWEuU2hhZGVyM0QuUEVSSU9EX01BVEVSSUFMLFxyXG4gICAgICAgICAgICAndV9MaW5lV2lkdGgnOiBMYXlhLlNoYWRlcjNELlBFUklPRF9NQVRFUklBTCxcclxuICAgICAgICAgICAgJ3VfVGltZSc6IExheWEuU2hhZGVyM0QuUEVSSU9EX1NDRU5FLFxyXG4gICAgICAgICAgICAndV9TcGVlZCc6IExheWEuU2hhZGVyM0QuUEVSSU9EX01BVEVSSUFMLFxyXG4gICAgICAgICAgICAndV9NYWluVGV4JzogTGF5YS5TaGFkZXIzRC5QRVJJT0RfTUFURVJJQUwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgc3RhdGVNYXAgPSB7XHJcbiAgICAgICAgICAgICdzX0N1bGwnOiBMYXlhLlNoYWRlcjNELlJFTkRFUl9TVEFURV9DVUxMLFxyXG4gICAgICAgICAgICAnc19CbGVuZCc6IExheWEuU2hhZGVyM0QuUkVOREVSX1NUQVRFX0JMRU5ELFxyXG4gICAgICAgICAgICAnc19CbGVuZFNyYyc6IExheWEuU2hhZGVyM0QuUkVOREVSX1NUQVRFX0JMRU5EX1NSQyxcclxuICAgICAgICAgICAgJ3NfQmxlbmREc3QnOiBMYXlhLlNoYWRlcjNELlJFTkRFUl9TVEFURV9CTEVORF9EU1QsXHJcbiAgICAgICAgICAgICdzX0RlcHRoVGVzdCc6IExheWEuU2hhZGVyM0QuUkVOREVSX1NUQVRFX0RFUFRIX1RFU1QsXHJcbiAgICAgICAgICAgICdzX0RlcHRoV3JpdGUnOiBMYXlhLlNoYWRlcjNELlJFTkRFUl9TVEFURV9ERVBUSF9XUklURVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCB2cyA9IGBcclxuICAgICAgICAjaW5jbHVkZSBcIkxpZ2h0aW5nLmdsc2xcIjtcclxuICAgICAgICBhdHRyaWJ1dGUgdmVjNCBhX1Bvc2l0aW9uO1xyXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFfVGV4Y29vcmQwO1xyXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFfTm9ybWFsO1xyXG4gICAgICAgIHVuaWZvcm0gbWF0NCB1X012cE1hdHJpeDtcclxuICAgICAgICB1bmlmb3JtIG1hdDQgdV9Xb3JsZE1hdDtcclxuICAgICAgICB2YXJ5aW5nIHZlYzIgdl9UZXhjb29yZDA7XHJcbiAgICAgICAgdmFyeWluZyB2ZWMzIHZfTm9ybWFsO1xyXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdV9UaW1lO1xyXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdV9TcGVlZDtcclxuXHJcbiAgICAgICAgI2lmZGVmIEJPTkVcclxuICAgICAgICBhdHRyaWJ1dGUgdmVjNCBhX0JvbmVJbmRpY2VzO1xyXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGFfQm9uZVdlaWdodHM7XHJcbiAgICAgICAgY29uc3QgaW50IGNfTWF4Qm9uZUNvdW50ID0gMjQ7XHJcbiAgICAgICAgdW5pZm9ybSBtYXQ0IHVfQm9uZXNbY19NYXhCb25lQ291bnRdO1xyXG4gICAgICAgICNlbmRpZlxyXG5cclxuICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdl9UZXhjb29yZDAgPSBhX1RleGNvb3JkMDtcclxuICAgICAgICAgICAgdmVjNCBwb3MgPSBhX1Bvc2l0aW9uO1xyXG4gICAgICAgICAgICBmbG9hdCB4ID0gKGFfUG9zaXRpb24ueCArIDUuMCkvMTAuMDtcclxuICAgICAgICAgICAgcG9zLnkgKz0geCAqIHNpbihwb3MueCArIHVfVGltZSAqIHVfU3BlZWQpO1xyXG4gICAgICAgICAgICBwb3MueSArPSB4ICogc2luKHBvcy56ICsgdV9UaW1lICogdV9TcGVlZCk7XHJcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uPXVfTXZwTWF0cml4ICogcG9zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBsZXQgcHMgPSBgXHJcbiAgICAgICAgI2lmZGVmIEZTSElHSFBSRUNJU0lPTlxyXG4gICAgICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuICAgICAgICAjZWxzZVxyXG4gICAgICAgIHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4gICAgICAgICNlbmRpZlxyXG4gICAgICAgIHVuaWZvcm0gdmVjNCB1X0NvbG9yO1xyXG4gICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVfTWFpblRleDtcclxuICAgICAgICB2YXJ5aW5nIHZlYzIgdl9UZXhjb29yZDA7XHJcblxyXG4gICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodV9NYWluVGV4LHZlYzIodl9UZXhjb29yZDAueCwxLjAtdl9UZXhjb29yZDAueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICB2YXIgY3VzdG9tU2hhZGVyID0gTGF5YS5TaGFkZXIzRC5hZGQoIFwiQ3RtTWF0X0ZsYWdcIiApO1xyXG4gICAgICAgIHZhciBzdWJTaGFkZXIgPSBuZXcgTGF5YS5TdWJTaGFkZXIoIGF0dHJpYnV0ZU1hcCwgdW5pZm9ybU1hcCwgTGF5YS5Ta2lubmVkTWVzaFNwcml0ZTNELnNoYWRlckRlZmluZXMsIExheWEuQmxpbm5QaG9uZ01hdGVyaWFsLnNoYWRlckRlZmluZXMgKTtcclxuICAgICAgICBjdXN0b21TaGFkZXIuYWRkU3ViU2hhZGVyKCBzdWJTaGFkZXIgKTtcclxuICAgICAgICBzdWJTaGFkZXIuYWRkU2hhZGVyUGFzcyggdnMsIHBzLCBzdGF0ZU1hcCApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IHsgQ3RtTWF0X0ZsYWcsIEN0bVNoYV9GbGFnIH0gZnJvbSBcIi4vQ3RtTWF0X0ZsYWdcIjtcclxuLyoqXHJcbiAqIOacrOekuuS+i+mHh+eUqOmdnuiEmuacrOeahOaWueW8j+WunueOsO+8jOiAjOS9v+eUqOe7p+aJv+mhtemdouWfuuexu++8jOWunueOsOmhtemdoumAu+i+keOAguWcqElERemHjOmdouiuvue9ruWcuuaZr+eahFJ1bnRpbWXlsZ7mgKfljbPlj6/lkozlnLrmma/ov5vooYzlhbPogZRcclxuICog55u45q+U6ISa5pys5pa55byP77yM57un5om/5byP6aG16Z2i57G777yM5Y+v5Lul55u05o6l5L2/55So6aG16Z2i5a6a5LmJ55qE5bGe5oCn77yI6YCa6L+HSURF5YaFdmFy5bGe5oCn5a6a5LmJ77yJ77yM5q+U5aaCdGhpcy50aXBMYmxs77yMdGhpcy5zY29yZUxibO+8jOWFt+acieS7o+eggeaPkOekuuaViOaenFxyXG4gKiDlu7rorq7vvJrlpoLmnpzmmK/pobXpnaLnuqfnmoTpgLvovpHvvIzpnIDopoHpopHnuYHorr/pl67pobXpnaLlhoXlpJrkuKrlhYPntKDvvIzkvb/nlKjnu6fmib/lvI/lhpnms5XvvIzlpoLmnpzmmK/ni6znq4vlsI/mqKHlnZfvvIzlip/og73ljZXkuIDvvIzlu7rorq7nlKjohJrmnKzmlrnlvI/lrp7njrDvvIzmr5TlpoLlrZDlvLnohJrmnKzjgIJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIHVpLnRlc3QuVGVzdFNjZW5lVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIG5ldyBDdG1TaGFfRmxhZygpLmluaXQoKTtcclxuXHJcbiAgICAgICAgbGV0IGN1czogQ3RtTWF0X0ZsYWc7XHJcbiAgICAgICAgTGF5YS5TY2VuZTNELmxvYWQoIFwicmVzL0xheWFTY2VuZV9DYXJfVG9jdXMvQ29udmVudGlvbmFsL0Nhcl9Ub2N1cy5sc1wiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKCB0aGlzLCAoIHJlczogTGF5YS5TY2VuZTNEICkgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGRBdCggcmVzLCAwICk7XHJcbiAgICAgICAgICAgIGN1cyA9IG5ldyBDdG1NYXRfRmxhZygpO1xyXG4gICAgICAgICAgICBMYXlhLlRleHR1cmUyRC5sb2FkKCBcInJlcy9MYXlhU2NlbmVfQ2FyX1RvY3VzL0NvbnZlbnRpb25hbC9Bc3NldHMvVGV4dHVyZXMvbmF0aW9uYWxGbGFnLmpwZ1wiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKCB0aGlzLCAoIHRleCApID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cy5NYWluVGV4ID0gdGV4O1xyXG4gICAgICAgICAgICB9ICkgKVxyXG4gICAgICAgICAgICBjdXMuU3BlZWQgPSB0aGlzLnNsaWRlci52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtb2RlbDogTGF5YS5NZXNoU3ByaXRlM0QgPSByZXMuZ2V0Q2hpbGRCeU5hbWUoIFwiR2FtZU9iamVjdFwiICkuZ2V0Q2hpbGRCeU5hbWUoIFwiUGxhbmVcIiApIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgICAgICBtb2RlbC5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBjdXM7XHJcbiAgICAgICAgfSApICk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmNoYW5nZUhhbmRsZXIgPSBMYXlhLkhhbmRsZXIuY3JlYXRlKCB0aGlzLCAoKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3VzLlNwZWVkID0gdGhpcy5zbGlkZXIudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCB0aGlzLnNsaWRlci52YWx1ZSApO1xyXG4gICAgICAgIH0sIG51bGwsIGZhbHNlICk7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkudGVzdCB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGVzdFNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcblx0XHRwdWJsaWMgc2xpZGVyOkxheWEuSFNsaWRlcjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRlc3QvVGVzdFNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnRlc3QuVGVzdFNjZW5lVUlcIixUZXN0U2NlbmVVSSk7XHJcbn1cciJdfQ==