export class CtmMat_Flag extends Laya.BlinnPhongMaterial
{
    public static readonly MainTex: number = Laya.Shader3D.propertyNameToID( "u_MainTex" );
    public static readonly Speed: number = Laya.Shader3D.propertyNameToID( "u_Speed" );

    constructor()
    {
        super();
        this.setShaderName( "CtmMat_Flag" );
        this.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
    }

    public set MainTex( value: Laya.BaseTexture )
    {
        this._shaderValues.setTexture( CtmMat_Flag.MainTex, value );
    }

    public set Speed( value: number )
    {
        this._shaderValues.setNumber( CtmMat_Flag.Speed, value );
    }
}

export class CtmSha_Flag
{
    public init(): void
    {
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

        let vs = `
        #include "Lighting.glsl";
        attribute vec4 a_Position;
        attribute vec2 a_Texcoord0;
        attribute vec3 a_Normal;
        uniform mat4 u_MvpMatrix;
        uniform mat4 u_WorldMat;
        varying vec2 v_Texcoord0;
        varying vec3 v_Normal;
        uniform float u_Time;
        uniform float u_Speed;

        #ifdef BONE
        attribute vec4 a_BoneIndices;
        attribute vec4 a_BoneWeights;
        const int c_MaxBoneCount = 24;
        uniform mat4 u_Bones[c_MaxBoneCount];
        #endif

        void main()
        {
            v_Texcoord0 = a_Texcoord0;
            vec4 pos = a_Position;
            float x = (a_Position.x + 5.0)/10.0;
            pos.y += x * sin(pos.x + u_Time * u_Speed);
            pos.y += x * sin(pos.z + u_Time * u_Speed);
            gl_Position=u_MvpMatrix * pos;
        }
        `;

        let ps = `
        #ifdef FSHIGHPRECISION
        precision highp float;
        #else
        precision mediump float;
        #endif
        uniform vec4 u_Color;
        uniform sampler2D u_MainTex;
        varying vec2 v_Texcoord0;

        void main()
        {
            gl_FragColor = texture2D(u_MainTex,vec2(v_Texcoord0.x,1.0-v_Texcoord0.y));
        }
        `;

        var customShader = Laya.Shader3D.add( "CtmMat_Flag" );
        var subShader = new Laya.SubShader( attributeMap, uniformMap, Laya.SkinnedMeshSprite3D.shaderDefines, Laya.BlinnPhongMaterial.shaderDefines );
        customShader.addSubShader( subShader );
        subShader.addShaderPass( vs, ps, stateMap );
    }
}