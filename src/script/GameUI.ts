import { ui } from "./../ui/layaMaxUI";
import { CtmMat_Flag, CtmSha_Flag } from "./CtmMat_Flag";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI
{
    constructor()
    {
        super();

        new CtmSha_Flag().init();

        let cus: CtmMat_Flag;
        Laya.Scene3D.load( "res/LayaScene_Car_Tocus/Conventional/Car_Tocus.ls", Laya.Handler.create( this, ( res: Laya.Scene3D ) =>
        {
            Laya.stage.addChildAt( res, 0 );
            cus = new CtmMat_Flag();
            Laya.Texture2D.load( "res/LayaScene_Car_Tocus/Conventional/Assets/Textures/nationalFlag.jpg", Laya.Handler.create( this, ( tex ) =>
            {
                cus.MainTex = tex;
            } ) )
            cus.Speed = this.slider.value;

            let model: Laya.MeshSprite3D = res.getChildByName( "GameObject" ).getChildByName( "Plane" ) as Laya.MeshSprite3D;
            model.meshRenderer.material = cus;
        } ) );

        this.slider.changeHandler = Laya.Handler.create( this, () =>
        {
            cus.Speed = this.slider.value;
            console.log( this.slider.value );
        }, null, false );
    }
}