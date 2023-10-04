class Properties {
    constructor() {
        Et(this, "isSecureConnection", window.location.protocol === "https:");
        Et(this, "tabInFocus", !0);
        Et(this, "loader", quickLoader.create());
        Et(this, "percent", -1);
        Et(this, "percentActive", 0);
        Et(this, "_isSupportedDevice", !1);
        Et(this, "_isSupportedBrowser", !1);
        Et(this, "_isSupportedWebGL", !1);
        Et(this, "_isSupportedMobileOrientation", !1);
        Et(this, "_isSupported", !1);
        Et(this, "time", 0);
        Et(this, "deltaTime", 0);
        Et(this, "isStageReady", !1);
        Et(this, "hasInitialized", !1);
        Et(this, "rawWidth", 0);
        Et(this, "rawHeight", 0);
        Et(this, "width", 0);
        Et(this, "height", 0);
        Et(this, "renderer", null);
        Et(this, "scene", null);
        Et(this, "camera", null);
        Et(this, "postprocessing", null);
        Et(this, "resolution", null);
        Et(this, "canvas", null);
        Et(this, "gl", null);
        Et(this, "webglOpts", {
            antialias: !1,
            alpha: !1,
            xrCompatible: !0
        });
        Et(this, "sharedUniforms", {
            u_time: {
                value: 0
            },
            u_deltaTime: {
                value: 1
            },
            u_resolution: {
                value: null
            },
            u_bgColor: {
                value: null
            }
        });
        Et(this, "changeCamera", new MinSignal$2);
        Et(this, "cameraDefaultPosition", new Vector3(0,0,5));
        Et(this, "cameraLookX", 0);
        Et(this, "cameraLookY", 0);
        Et(this, "cameraDistance", 5);
        Et(this, "cameraLookStrength", 0);
        Et(this, "cameraLookEaseDamp", 0);
        Et(this, "cameraShakePositionStrength", .2);
        Et(this, "cameraShakePositionSpeed", .12);
        Et(this, "cameraShakeRotationStrength", .0016);
        Et(this, "cameraShakeRotationSpeed", .3);
        Et(this, "cameraDollyZoomFovOffset", 0);
        Et(this, "smaa", null);
        Et(this, "fxaa", null);
        Et(this, "cameraMotionBlur", null);
        Et(this, "gtao", null);
        Et(this, "bokeh", null);
        Et(this, "bloom", null);
        Et(this, "screenPaint", null);
        Et(this, "screenPaintDistortion", null);
        Et(this, "final", null);
        Et(this, "bgColorHex", "#000000");
        Et(this, "bgColor", new Color);
        Et(this, "opacity", 1);
        Et(this, "bloomAmount", 0 * .959);
        Et(this, "bloomRadius", .508);
        Et(this, "bloomThreshold", .158);
        Et(this, "bloomSmoothWidth", .141);
        Et(this, "haloWidth", .538);
        Et(this, "haloRGBShift", .049);
        Et(this, "haloStrength", .278);
        Et(this, "haloMaskInner", .18);
        Et(this, "haloMaskOuter", 0);
        Et(this, "vignetteFrom", 0);
        Et(this, "vignetteTo", 3);
        Et(this, "vignetteColorHex", "#ffffff");
        Et(this, "saturation", 1);
        Et(this, "contrast", -.011);
        Et(this, "brightness", .94);
        Et(this, "postInvert", 0);
        Et(this, "tintColorHex", "#25252b");
        Et(this, "tintOpacity", 0);
        Et(this, "bokehAmount", 0);
        Et(this, "bokehFNumber", .181);
        Et(this, "bokehFocusDistance", 2.5);
        Et(this, "bokehFocalLength", .35);
        Et(this, "bokehKFilmHeight", 25.26);
        Et(this, "screenPaintNeedsMouseDown", !1);
        Et(this, "screenPaintMinRadius", 0);
        Et(this, "screenPaintMaxRadius", 100);
        Et(this, "screenPaintRadiusDistanceRange", 100);
        Et(this, "screenPaintPushStrength", 25);
        Et(this, "screenPaintVelocityDissipation", .975);
        Et(this, "screenPaintWeight1Dissipation", .95);
        Et(this, "screenPaintWeight2Dissipation", .8);
        Et(this, "screenPaintUseNoise", !0);
        Et(this, "screenPaintCurlScale", .03);
        Et(this, "screenPaintCurlStrength", 3);
        Et(this, "screenPaintDistortionAmount", 20);
        Et(this, "screenPaintDistortionRGBShift", .5);
        Et(this, "screenPaintDistortionColorMultiplier", 10);
        Et(this, "screenPaintDistortionMultiplier", 5);
        Et(this, "upscalerSharpness", 1);
        Et(this, "particleMode", 0);
        Et(this, "particleModeRatio", 0);
        Et(this, "particlePresets", [{
            simDieSpeed: .32,
            curlStrMul: .6,
            windStrMul: 1.2
        }, {
            simDieSpeed: .48,
            curlStrMul: .6,
            windStrMul: 1.2
        }]);
        Et(this, "onFirstClicked", new MinSignal$2);
        Et(this, "onPageChanged", new MinSignal$2);
        Et(this, "activePageIndex", null);
        Et(this, "isPreloaderFinished", !1);
        Et(this, "themeSignal", new MinSignal$2);
        Et(this, "orbitControls", null);
        Et(this, "pointer", new Vector2);
        Et(this, "screenPaint", null);
        Et(this, "themeId", 0);
        Et(this, "prevThemeId", 0);
        Et(this, "themeTransitionRatio", 0);
        Et(this, "isThemeTransitionActive", !1);
        Et(this, "uiLoops", new Map);
        Et(this, "infiniteGridSignalStart", new MinSignal$2);
        Et(this, "infiniteGridSignalEnd", new MinSignal$2);
        Et(this, "infiniteGridSignalOnVisibilityEnd", new MinSignal$2)
    }
}

const properties = new Properties;


var gui = new GUI$1
  , particlesVert = `#define GLSLIFY 1
attribute vec4 a_random;
attribute vec2 a_simUv;
uniform sampler2D u_prevPosTex;
uniform sampler2D u_currPosTex;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_opacity;
uniform float u_pSizeMul;
uniform float u_pSoftMul;
uniform float u_focusDist;
varying float v_softness;
varying float v_opacity;
varying vec3 v_color;
float sizeFromLife(float life){float cut=0.008;return(1.0-smoothstep(1.0-cut,1.0,life))*smoothstep(0.0,cut,life);}
void main(){
    vec4 positionLife=texture2D(u_currPosTex,a_simUv);
    float lifeSize=sizeFromLife(positionLife.w);
    vec3 pos=positionLife.xyz;
    vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
    float dist=u_focusDist*10.0;
    float coef=abs(-mvPosition.z-dist)*0.3+pow(max(0.0,-mvPosition.z-dist),2.5)*0.5;
    v_softness=coef*u_pSoftMul*10.0;
    v_opacity=1.0;
    v_opacity=u_opacity*lifeSize;
    gl_Position=projectionMatrix*mvPosition;
    float pSize=(coef*200.0*u_pSizeMul)/-mvPosition.z*u_resolution.y/1280.0;
    gl_PointSize=pSize*lifeSize;
}`
  , particlesFrag = `#define GLSLIFY 1
varying float v_softness;
varying float v_opacity;
varying vec3 v_color;
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
void main(){
    float d=length(gl_PointCoord.xy*2.0-1.0);
    float b=linearStep(0.0,v_softness+fwidth(d),1.0-d);
    vec3 color=v_color*b*v_opacity;
    gl_FragColor=vec4(color,b*v_opacity);
}`
  , particlePositionShader = `#define GLSLIFY 1
uniform sampler2D u_defaultPosTex;
uniform sampler2D u_prevPosTex;
uniform sampler2D u_currVelTex;
uniform sampler2D u_logoPosTex;
uniform float u_simDieSpeed;
uniform vec3 u_curlNoiseScale;
uniform vec3 u_curlStrength;
uniform float u_curlStrMul;
uniform float u_simSpeed;
uniform vec3 u_bounds;
uniform vec3 u_screenBounds;
uniform float u_deltaTime;
uniform float u_time;
uniform float u_mode;
uniform float u_logoCutPercent;
varying vec2 v_uv;
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
float permute(float x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}
vec4 grad4(float j,vec4 ip){
    const vec4 ones=vec4(1.0,1.0,1.0,-1.0);
    vec4 p,s;
    p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;
    p.w=1.5-dot(abs(p.xyz),ones.xyz);
    s=vec4(lessThan(p,vec4(0.0)));
    p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;
    return p;
}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){
    const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);
    vec4 i=floor(v+dot(v,vec4(F4)));
    vec4 x0=v-i+dot(i,C.xxxx);
    vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);
    vec3 isYZ=step(x0.zww,x0.yyz);
    i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;
    vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);
    vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);
    float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);
    vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<2;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(zNoisePotentialDerivatives[1]-yNoisePotentialDerivatives[2],xNoisePotentialDerivatives[2]-zNoisePotentialDerivatives[0],yNoisePotentialDerivatives[0]-xNoisePotentialDerivatives[1]);}vec3 hash33(vec3 p3){p3=fract(p3*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yxz+33.33);return fract((p3.xxy+p3.yxx)*p3.zyx);}
    
    void main(){
        vec4 positionLife=texture2D(u_prevPosTex,v_uv);vec4 velInfo=texture2D(u_currVelTex,v_uv);positionLife.w-=u_deltaTime*u_simDieSpeed*0.01*(1.0+velInfo.w);if(positionLife.w<0.0){vec3 h=hash33(vec3(v_uv,u_time));float modeCut=step(u_logoCutPercent,h.x);if(u_mode*modeCut>0.5){vec3 p=texture2D(u_logoPosTex,v_uv).xyz;positionLife.xyz=p+h*0.2;}else{positionLife.xyz=texture2D(u_defaultPosTex,v_uv).xyz;}positionLife.w=1.0;}vec3 boundCheck=step(positionLife.xyz,u_bounds);boundCheck*=step(-u_bounds,positionLife.xyz);positionLife.w*=boundCheck.x*boundCheck.y*boundCheck.z;positionLife.xyz+=velInfo.xyz*u_deltaTime;vec3 curlStr=u_curlStrength*u_curlStrMul;vec3 curlScale=u_curlNoiseScale*1.0;vec3 curlVel=curl(positionLife.xyz*curlScale,u_time*u_simSpeed,0.02)*curlStr*u_deltaTime;curlVel/=1.0+velInfo.w*u_mode;positionLife.xyz+=curlVel;
    gl_FragColor=positionLife;
}`
  , particleVelocityShader = `#define GLSLIFY 1
uniform sampler2D u_prevPosTex;
uniform sampler2D u_prevVelTex;
uniform sampler2D u_logoPosTex;uniform sampler2D u_mousePaintTex;uniform float u_attractForce;
uniform vec3 u_windForce;uniform float u_windStrMul;uniform float u_mouseMoveIntensity;
uniform float u_mouseStrength;uniform vec3 u_screenBounds;uniform float u_simDieSpeed;
uniform float u_deltaTime;uniform float u_time;uniform float u_mode;uniform float u_logoCutPercent;
varying vec2 v_uv;
vec3 hash33(vec3 p3){p3=fract(p3*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yxz+33.33);return fract((p3.xxy+p3.yxx)*p3.zyx);}vec2 posToUv(vec3 pos){vec2 uv=pos.xy/u_screenBounds.xy;uv=(uv+vec2(1.0))/2.0;uv.y=1.0-uv.y;return uv;}
void main(){
    vec4 positionLife=texture2D(u_prevPosTex,v_uv);vec4 velInfo=texture2D(u_prevVelTex,v_uv);
    positionLife.w-=u_deltaTime*u_simDieSpeed*0.01;if(positionLife.w<0.0){vec3 h=hash33(vec3(v_uv,u_time));
        float modeCut=step(u_logoCutPercent,h.x);velInfo.w=(modeCut*h.y*2.0+1.0)*u_mode;}velInfo.xyz*=0.975;
        if(velInfo.w*u_mode>1.0){
            vec3 originPos=texture2D(u_logoPosTex,v_uv).xyz;
            vec3 attrV=originPos-positionLife.xyz;
            
            float dist2=dot(attrV,attrV);if(dist2>0.0001){attrV/=sqrt(dist2);}else{attrV=vec3(1.0,0.0,0.0);}
            velInfo.xyz+=attrV*u_attractForce*velInfo.w*u_deltaTime;}
            vec3 windVel=u_windForce*u_deltaTime*u_windStrMul;windVel/=1.0+velInfo.w*u_mode;velInfo.xyz+=windVel;
            vec2 posUv=posToUv(positionLife.xyz);
            vec3 mousePaintVel=(texture2D(u_mousePaintTex,posUv).xyz-0.5+0.001)*2.0;mousePaintVel.z=0.0;
            vec3 mouseFinalVel=mousePaintVel*0.8*u_mouseMoveIntensity*u_mouseStrength;
            mouseFinalVel*=1.0+velInfo.w*0.5*u_mode;velInfo.xyz+=mouseFinalVel;
            gl_FragColor=velInfo;
        }`;
function packTexture(et, $) {
    let tt = et.attributes
      , nt = {
        x: 0,
        y: 0
    }
      , rt = $.pack.length
      , it = Object.values(tt)[0].count
      , ot = $.vertexCount || it
      , st = Math.ceil(Math.sqrt(ot));
    nt.x = st * rt,
    nt.y = st;
    let lt = nt.x * nt.y * 4
      , ut = new Float32Array(lt)
      , ct = 0
      , ht = {};
    $.pack.flat().forEach(gt=>{
        ht[gt] === void 0 && (ht[gt] = 0)
    }
    );
    for (let gt = 0; gt < it; gt++)
        for (let vt = 0; vt < rt; vt++) {
            let yt = $.pack[vt];
            for (let wt = 0; wt < 4; wt++) {
                let mt = yt[wt];
                if (mt !== void 0) {
                    let _t = ht[mt];
                    ut[ct] = tt[mt].array[_t],
                    ht[mt] += 1
                } else
                    ut[ct] = 0;
                ct++
            }
        }
    for (; ct < lt; )
        ut[ct] = 0,
        ct++;
    return {
        texture: fboHelper.createDataTexture(ut, nt.x, nt.y, !0, !0, !0),
        textureSize: nt
    }
}
const TEX_SIZE = 128
  , PARTICLE_COUNT = TEX_SIZE * TEX_SIZE
  , GUI = settings.LOOK_DEV_MODE
  , SPAWN = {
    bounds: {
        x: 4,
        y: 2.4,
        z: .64
    },
    offset: {
        x: -3,
        y: -.5,
        z: 0
    }
}
  , KILL = {
    bounds: {
        x: 7,
        y: 5,
        z: 2
    }
};
/* Ghim */
class Particles {
    constructor() {
        Et(this, "container", new Object3D);
        Et(this, "prevPosRt", null);
        Et(this, "currPosRt", null);
        Et(this, "posSimMat", null);
        Et(this, "_v3", new Vector3);
        Et(this, "_graphVal", 0);
        Et(this, "sharedUniforms", {
            u_defaultPosTex: {
                value: null
            },
            u_prevPosTex: {
                value: null
            },
            u_currPosTex: {
                value: null
            },
            u_prevVelTex: {
                value: null
            },
            u_currVelTex: {
                value: null
            },
            u_logoPosTex: {
                value: null
            },
            u_mode: {
                value: 0
            },
            u_simDieSpeed: {
                value: .32
            },
            u_logoCutPercent: {
                value: .4
            },
            u_deltaTime: {
                value: 0
            },
            u_time: properties.sharedUniforms.u_time
        })
    }
    preInit() {
        properties.loader.add(settings.MODEL_PATH + "lsn_logo.buf", {
            onLoad: $=>this._logoModelLoad($)
        }),
        this._initPoints(),
        this._initTextures()
    }
    _logoModelLoad($) {
        const nt = [-.18, .16, 0].map(lt=>lt * Math.PI)
          , rt = [0, 0, -.32];
        $.translate(rt[0], rt[1], rt[2]),
        $.scale(.9, .9, .9),
        ["X", "Y"].forEach((lt,ut)=>{
            $[`rotate ${lt}`](nt[ut])
        }
        );
        let it = {
            vertexCount: Math.pow(64, 2),
            pack: [["position", "position", "position"]]
        };
        const {texture: ot, textureSize: st} = packTexture($, it);
        this.sharedUniforms.u_logoPosTex.value = ot
    }
    _initPoints() {
        let $ = new Float32Array(PARTICLE_COUNT * 3);
        for (let st = 0; st < PARTICLE_COUNT; st++) {
            let lt = this._getCubePosDistribution(SPAWN.bounds, SPAWN.offset, st > PARTICLE_COUNT * .5 ? 2 : 0);
            $[st * 3 + 0] = lt.x,
            $[st * 3 + 1] = lt.y,
            $[st * 3 + 2] = lt.z
        }
        let tt = new Float32Array(PARTICLE_COUNT * 4);
        for (let st = 0; st < PARTICLE_COUNT * 4; st++)
            tt[st] = Math.random();
        let nt = new Float32Array(PARTICLE_COUNT * 2);
        for (let st = 0; st < PARTICLE_COUNT; st++)
            nt[st * 2 + 0] = (st % TEX_SIZE + .5) / TEX_SIZE,
            nt[st * 2 + 1] = (Math.floor(st / TEX_SIZE) + .5) / TEX_SIZE;
        let rt = new BufferGeometry;
        rt.setAttribute("position", new BufferAttribute($,3)),
        rt.setAttribute("a_random", new BufferAttribute(tt,4)),
        rt.setAttribute("a_simUv", new BufferAttribute(nt,2));
        let it = new ShaderMaterial({
            uniforms: kn(wn({}, this.sharedUniforms), {
                u_resolution: properties.sharedUniforms.u_resolution,
                u_opacity: {
                    value: .32,
                    gui: !0
                },
                u_pSizeMul: {
                    value: .4,
                    gui: !0
                },
                u_pSoftMul: {
                    value: .92,
                    gui: [0, 2, .001]
                },
                u_focusDist: {
                    value: .32,
                    gui: !0
                }
            }),
            vertexShader: particlesVert,
            fragmentShader: particlesFrag,
            depthTest: !1,
            depthWrite: !1,
            transparent: !0
        });
        it.defines = {},
        it.extensions.derivatives = !0;
        let ot = new Points(rt,it);
        ot.frustumCulled = !1,
        this.mesh = ot,
        this.container.add(ot)
    }
    _initTextures() {
        let $ = this.mesh.geometry.attributes.position.array
          , tt = new Float32Array(PARTICLE_COUNT * 4);
        for (let rt = 0; rt < PARTICLE_COUNT; rt++)
            tt[rt * 4 + 0] = $[rt * 3 + 0],
            tt[rt * 4 + 1] = $[rt * 3 + 1],
            tt[rt * 4 + 2] = $[rt * 3 + 2],
            tt[rt * 4 + 3] = rt / PARTICLE_COUNT;
        let nt = fboHelper.createDataTexture(tt, TEX_SIZE, TEX_SIZE, !0, !0);
        nt.needsUpdate = !0,
        this.sharedUniforms.u_defaultPosTex.value = nt,
        this.prevPosRt = fboHelper.createRenderTarget(TEX_SIZE, TEX_SIZE, !0, !0),
        this.currPosRt = fboHelper.createRenderTarget(TEX_SIZE, TEX_SIZE, !0, !0),
        fboHelper.copy(nt, this.currPosRt),
        this.posSimMat = new RawShaderMaterial({
            uniforms: kn(wn({}, this.sharedUniforms), {
                u_mousePaintTex: screenPaint.sharedUniforms.u_currPaintTexture,
                u_curlNoiseScale: {
                    value: new Vector3(.2,.6,.2),
                    gui: [0, 2, .001]
                },
                u_curlStrength: {
                    value: new Vector3(.2,.12,.12),
                    gui: !0
                },
                u_curlStrMul: {
                    value: .8,
                    gui: !0
                },
                u_simSpeed: {
                    value: .12,
                    gui: [0, .4, .001]
                },
                u_bounds: {
                    value: new Vector3().copy(KILL.bounds)
                },
                u_screenBounds: {
                    value: new Vector3
                }
            }),
            vertexShader: fboHelper.vertexShader,
            fragmentShader: fboHelper.precisionPrefix + particlePositionShader
        }),
        this.sharedUniforms.u_prevPosTex.value = this.prevPosRt.texture,
        this.sharedUniforms.u_currPosTex.value = this.currPosRt.texture,
        this.prevVelRt = fboHelper.createRenderTarget(TEX_SIZE, TEX_SIZE, !0, !0),
        this.currVelRt = fboHelper.createRenderTarget(TEX_SIZE, TEX_SIZE, !0, !0),
        this.velSimMat = new RawShaderMaterial({
            uniforms: kn(wn({}, this.sharedUniforms), {
                u_mousePaintTex: screenPaint.sharedUniforms.u_currPaintTexture,
                u_attractForce: {
                    value: .32
                },
                u_windForce: {
                    value: new Vector3(.16,0,0),
                    gui: [0, 2, .01]
                },
                u_windStrMul: {
                    value: 1
                },
                u_mouseStrength: {
                    value: .2,
                    gui: [0, 4, .01]
                },
                u_mouseMoveIntensity: {
                    value: 0
                },
                u_screenBounds: {
                    value: new Vector3
                }
            }),
            vertexShader: fboHelper.vertexShader,
            fragmentShader: fboHelper.precisionPrefix + particleVelocityShader
        }),
        this.sharedUniforms.u_prevVelTex.value = this.prevVelRt.texture,
        this.sharedUniforms.u_currVelTex.value = this.currVelRt.texture
    }
    init() {
        if (!GUI)
            return;
        let $ = new tweakpane.exports.Pane({});
        $.containerElem_.style.width = "300px",
        guiAddUniforms($, this.mesh.material, "particleLook");
        let tt = guiAddUniforms($, this.posSimMat, "particleSim");
        guiAddUniforms(tt, this.velSimMat)
    }
    resize($, tt) {
        this._getScreenBounds($, tt)
    }
    _getScreenBounds($, tt) {
        let nt = properties.camera;
        this._v3.set(1, -1, .5),
        this._v3.unproject(nt),
        this._v3.sub(nt.position).normalize();
        let rt = -nt.position.z / this._v3.z;
        this._v3.multiplyScalar(rt),
        this._v3.add(nt.position),
        this.posSimMat.uniforms.u_screenBounds.value.copy(this._v3),
        this.velSimMat.uniforms.u_screenBounds.value.copy(this._v3)
    }
    update($) {
        this._renderRts(),
        this._updateUniforms($)
    }
    _updateUniforms($) {
        this.sharedUniforms.u_deltaTime.value = Math.min($, 1 / 60 * 3);
        let tt = input.lerpedWheelDelta;
        tt *= .0144;
        const nt = this.velSimMat.uniforms
          , rt = this.posSimMat.uniforms;
        nt.u_windForce.value.y = tt,
        rt.u_curlStrength.value.y = .12 + Math.abs(tt) * .5;
        const it = properties.particlePresets[properties.particleMode];
        this.sharedUniforms.u_simDieSpeed.value = it.simDieSpeed,
        this.sharedUniforms.u_logoCutPercent.value = .4,
        rt.u_curlStrMul.value = it.curlStrMul,
        nt.u_windStrMul.value = it.windStrMul,
        this.sharedUniforms.u_mode.value = properties.particleModeRatio > .5 ? 1 : 0;
        let ot = properties.particleMode
          , st = properties.particleModeRatio;
        ot == 1 ? st > .68 && st < .8 && (this.sharedUniforms.u_simDieSpeed.value = 48,
        this.sharedUniforms.u_logoCutPercent.value = 0) : st > .24 && st < .36 && (this.sharedUniforms.u_simDieSpeed.value = 48,
        this.sharedUniforms.u_logoCutPercent.value = 0,
        rt.u_curlStrMul.value = 16,
        nt.u_windStrMul.value = 16),
        this._getMouseIntensity()
    }
    _renderRts($) {
        let tt;
        tt = this.prevPosRt,
        this.prevPosRt = this.currPosRt,
        this.currPosRt = tt,
        this.sharedUniforms.u_prevPosTex.value = this.prevPosRt.texture,
        this.sharedUniforms.u_currPosTex.value = this.currPosRt.texture,
        fboHelper.render(this.posSimMat, this.currPosRt),
        tt = this.prevVelRt,
        this.prevVelRt = this.currVelRt,
        this.currVelRt = tt,
        this.sharedUniforms.u_prevVelTex.value = this.prevVelRt.texture,
        this.sharedUniforms.u_currVelTex.value = this.currVelRt.texture,
        fboHelper.render(this.velSimMat, this.currVelRt)
    }
    _getMouse3d() {
        let $ = properties.camera;
        this._v3.set(input.mouseXY.x, input.mouseXY.y, .5),
        this._v3.unproject($),
        this._v3.sub($.position).normalize();
        let tt = -$.position.z / this._v3.z;
        return this._v3.multiplyScalar(tt),
        this.testMesh.position.copy($.position).add(this._v3),
        this._v3
    }
    _getMouseIntensity() {
        let $ = input.deltaXY.length() * 32;
        $ = Math.min($, 2);
        let tt = this.velSimMat.uniforms.u_mouseMoveIntensity.value;
        return this.velSimMat.uniforms.u_mouseMoveIntensity.value += ($ - tt) * .072,
        properties.tabInFocus || (this.velSimMat.uniforms.u_mouseMoveIntensity.value = 0),
        $
    }
    _getCubePosDistribution($, tt, nt=0) {
        return Object.keys($).forEach(rt=>$[rt] += nt * (Math.random() - .5)),
        {
            x: (Math.pow(Math.random(), 4) * 2 - 1) * $.x + tt.x,
            y: (Math.random() * 2 - 1) * $.y + tt.y,
            z: (Math.random() * 2 - 1) * $.z + tt.z
        }
    }
}
var particles = new Particles;
class ThemeController {
    preInit() {}
    init() {}
    resize() {}
    update($) {
        let tt = properties.themeId
          , nt = 0
          , rt = "#fff";
        tt === 2 && (nt = 1,
        rt = "#000"),
        properties.postInvert += (nt - properties.postInvert) * .07,
        properties.vignetteColorHex = rt
    }
}
var themeController = new ThemeController;
class Visuals {
    constructor() {
        Et(this, "container", new Object3D);
        Et(this, "components", [particles, themeController])
    }
    preInit() {
        this.components.forEach($=>$.preInit()),
        this.components.forEach($=>{
            $.container && this.container.add($.container)
        }
        )
    }
    init() {
        this.components.forEach($=>$.init())
    }
    resize($, tt) {
        this.components.forEach(nt=>nt.resize($, tt))
    }
    update($) {
        this.components.forEach(tt=>tt.update($))
    }
}
var visuals = new Visuals;
const oo = class {
    constructor() {
        Et(this, "_scale", 1);
        Et(this, "_amplitude", 1);
        Et(this, "_r", []);
        for (let $ = 0; $ < oo.MAX_VERTICES; ++$)
            this._r.push(Math.random() - .5)
    }
    getVal($) {
        const tt = $ * this._scale
          , nt = Math.floor(tt)
          , rt = tt - nt
          , it = rt * rt * (3 - 2 * rt)
          , ot = nt & oo.MAX_VERTICES_MASK
          , st = ot + 1 & oo.MAX_VERTICES_MASK;
        return math.mix(this._r[ot], this._r[st], it) * this._amplitude
    }
    get amplitude() {
        return this._amplitude
    }
    set amplitude($) {
        this._amplitude = $
    }
    get scale() {
        return this._scale
    }
    set scale($) {
        this._scale = $
    }
}
;
let Simple1DNoise = oo;
Et(Simple1DNoise, "MAX_VERTICES", 256),
Et(Simple1DNoise, "MAX_VERTICES_MASK", oo.MAX_VERTICES - 1);
const _e = new Euler
  , _v = new Vector3
  , Io = class {
    constructor() {
        Et(this, "_position", new Vector3);
        Et(this, "_rotation", new Quaternion);
        Et(this, "_scale", new Vector3(1,1,1));
        Et(this, "_matrix", new Matrix4);
        Et(this, "_enablePositionNoise", !0);
        Et(this, "_enableRotationNoise", !0);
        Et(this, "_positionFrequency", .25);
        Et(this, "_rotationFrequency", .25);
        Et(this, "_positionAmplitude", .3);
        Et(this, "_rotationAmplitude", .003);
        Et(this, "_positionScale", new Vector3(1,1,1));
        Et(this, "_rotationScale", new Vector3(1,1,0));
        Et(this, "_positionFractalLevel", 3);
        Et(this, "_rotationFractalLevel", 3);
        Et(this, "_times", new Float32Array(6));
        Et(this, "_noise", new Simple1DNoise);
        this.rehash()
    }
    rehash() {
        for (let $ = 0; $ < 6; $++)
            this._times[$] = Math.random() * -1e4
    }
    _fbm($, tt) {
        let nt = 0
          , rt = .5;
        for (let it = 0; it < tt; it++)
            nt += rt * this._noise.getVal($),
            $ *= 2,
            rt *= .5;
        return nt
    }
    update($) {
        const tt = $ === void 0 ? 16.666666666666668 : $;
        if (this._enablePositionNoise) {
            for (let nt = 0; nt < 3; nt++)
                this._times[nt] += this._positionFrequency * tt;
            _v.set(this._fbm(this._times[0], this._positionFractalLevel), this._fbm(this._times[1], this._positionFractalLevel), this._fbm(this._times[2], this._positionFractalLevel)),
            _v.multiply(this._positionScale),
            _v.multiplyScalar(this._positionAmplitude * Io.FBM_NORM),
            this._position.copy(_v)
        }
        if (this._enableRotationNoise) {
            for (let nt = 0; nt < 3; nt++)
                this._times[nt + 3] += this._rotationFrequency * tt;
            _v.set(this._fbm(this._times[3], this._rotationFractalLevel), this._fbm(this._times[4], this._rotationFractalLevel), this._fbm(this._times[5], this._rotationFractalLevel)),
            _v.multiply(this._rotationScale),
            _v.multiplyScalar(this._rotationAmplitude * Io.FBM_NORM),
            _e.set(_v.x, _v.y, _v.z),
            this._rotation.setFromEuler(_e)
        }
        this._matrix.compose(this._position, this._rotation, this._scale)
    }
    get positionAmplitude() {
        return this._positionAmplitude
    }
    set positionAmplitude($) {
        this._positionAmplitude = $
    }
    get positionFrequency() {
        return this._positionFrequency
    }
    set positionFrequency($) {
        this._positionFrequency = $
    }
    get rotationAmplitude() {
        return this._rotationAmplitude
    }
    set rotationAmplitude($) {
        this._rotationAmplitude = $
    }
    get rotationFrequency() {
        return this._rotationFrequency
    }
    set rotationFrequency($) {
        this._rotationFrequency = $
    }
    get matrix() {
        return this._matrix
    }
    set matrix($) {
        this._matrix = $
    }
}
;
let BrownianMotion = Io;
Et(BrownianMotion, "FBM_NORM", 1 / .75);
const _changeEvent = {
    type: "change"
}
  , _startEvent = {
    type: "start"
}
  , _endEvent = {
    type: "end"
};
class OrbitControls extends EventDispatcher {
    constructor($, tt) {
        super(),
        tt === void 0 && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
        tt === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
        this.object = $,
        this.domElement = tt,
        this.domElement.style.touchAction = "none",
        this.enabled = !0,
        this.target = new Vector3,
        this.minDistance = 0,
        this.maxDistance = 1 / 0,
        this.minZoom = 0,
        this.maxZoom = 1 / 0,
        this.minPolarAngle = 0,
        this.maxPolarAngle = Math.PI,
        this.minAzimuthAngle = -1 / 0,
        this.maxAzimuthAngle = 1 / 0,
        this.enableDamping = !1,
        this.dampingFactor = .05,
        this.enableZoom = !0,
        this.zoomSpeed = 1,
        this.enableRotate = !0,
        this.rotateSpeed = 1,
        this.enablePan = !0,
        this.panSpeed = 1,
        this.screenSpacePanning = !0,
        this.keyPanSpeed = 7,
        this.autoRotate = !1,
        this.autoRotateSpeed = 2,
        this.keys = {
            LEFT: "ArrowLeft",
            UP: "ArrowUp",
            RIGHT: "ArrowRight",
            BOTTOM: "ArrowDown"
        },
        this.mouseButtons = {
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.PAN
        },
        this.touches = {
            ONE: TOUCH.ROTATE,
            TWO: TOUCH.DOLLY_PAN
        },
        this.target0 = this.target.clone(),
        this.position0 = this.object.position.clone(),
        this.zoom0 = this.object.zoom,
        this._domElementKeyEvents = null,
        this.getPolarAngle = function() {
            return st.phi
        }
        ,
        this.getAzimuthalAngle = function() {
            return st.theta
        }
        ,
        this.getDistance = function() {
            return this.object.position.distanceTo(this.target)
        }
        ,
        this.listenToKeyEvents = function(Vt) {
            Vt.addEventListener("keydown", Dt),
            this._domElementKeyEvents = Vt
        }
        ,
        this.saveState = function() {
            nt.target0.copy(nt.target),
            nt.position0.copy(nt.object.position),
            nt.zoom0 = nt.object.zoom
        }
        ,
        this.reset = function() {
            nt.target.copy(nt.target0),
            nt.object.position.copy(nt.position0),
            nt.object.zoom = nt.zoom0,
            nt.object.updateProjectionMatrix(),
            nt.dispatchEvent(_changeEvent),
            nt.update(),
            it = rt.NONE
        }
        ,
        this.update = function() {
            const Vt = new Vector3
              , hn = new Quaternion().setFromUnitVectors($.up, new Vector3(0,1,0))
              , vn = hn.clone().invert()
              , En = new Vector3
              , Ut = new Quaternion
              , Cn = 2 * Math.PI;
            return function() {
                const Hn = nt.object.position;
                Vt.copy(Hn).sub(nt.target),
                Vt.applyQuaternion(hn),
                st.setFromVector3(Vt),
                nt.autoRotate && it === rt.NONE && Zt(Pt()),
                nt.enableDamping ? (st.theta += lt.theta * nt.dampingFactor,
                st.phi += lt.phi * nt.dampingFactor) : (st.theta += lt.theta,
                st.phi += lt.phi);
                let yn = nt.minAzimuthAngle
                  , xn = nt.maxAzimuthAngle;
                return isFinite(yn) && isFinite(xn) && (yn < -Math.PI ? yn += Cn : yn > Math.PI && (yn -= Cn),
                xn < -Math.PI ? xn += Cn : xn > Math.PI && (xn -= Cn),
                yn <= xn ? st.theta = Math.max(yn, Math.min(xn, st.theta)) : st.theta = st.theta > (yn + xn) / 2 ? Math.max(yn, st.theta) : Math.min(xn, st.theta)),
                st.phi = Math.max(nt.minPolarAngle, Math.min(nt.maxPolarAngle, st.phi)),
                st.makeSafe(),
                st.radius *= ut,
                st.radius = Math.max(nt.minDistance, Math.min(nt.maxDistance, st.radius)),
                nt.enableDamping === !0 ? nt.target.addScaledVector(ct, nt.dampingFactor) : nt.target.add(ct),
                Vt.setFromSpherical(st),
                Vt.applyQuaternion(vn),
                Hn.copy(nt.target).add(Vt),
                nt.object.lookAt(nt.target),
                nt.enableDamping === !0 ? (lt.theta *= 1 - nt.dampingFactor,
                lt.phi *= 1 - nt.dampingFactor,
                ct.multiplyScalar(1 - nt.dampingFactor)) : (lt.set(0, 0, 0),
                ct.set(0, 0, 0)),
                ut = 1,
                ht || En.distanceToSquared(nt.object.position) > ot || 8 * (1 - Ut.dot(nt.object.quaternion)) > ot ? (nt.dispatchEvent(_changeEvent),
                En.copy(nt.object.position),
                Ut.copy(nt.object.quaternion),
                ht = !1,
                !0) : !1
            }
        }(),
        this.dispose = function() {
            nt.domElement.removeEventListener("contextmenu", mn),
            nt.domElement.removeEventListener("pointerdown", Mn),
            nt.domElement.removeEventListener("pointercancel", $n),
            nt.domElement.removeEventListener("wheel", rr),
            nt.domElement.removeEventListener("pointermove", Dn),
            nt.domElement.removeEventListener("pointerup", Pn),
            nt._domElementKeyEvents !== null && nt._domElementKeyEvents.removeEventListener("keydown", Dt)
        }
        ;
        const nt = this
          , rt = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };
        let it = rt.NONE;
        const ot = 1e-6
          , st = new Spherical
          , lt = new Spherical;
        let ut = 1;
        const ct = new Vector3;
        let ht = !1;
        const ft = new Vector2
          , gt = new Vector2
          , vt = new Vector2
          , yt = new Vector2
          , wt = new Vector2
          , mt = new Vector2
          , _t = new Vector2
          , bt = new Vector2
          , Mt = new Vector2
          , St = []
          , At = {};
        function Pt() {
            return 2 * Math.PI / 60 / 60 * nt.autoRotateSpeed
        }
        function Ot() {
            return Math.pow(.95, nt.zoomSpeed)
        }
        function Zt(Vt) {
            lt.theta -= Vt
        }
        function Nt(Vt) {
            lt.phi -= Vt
        }
        const Tt = function() {
            const Vt = new Vector3;
            return function(vn, En) {
                Vt.setFromMatrixColumn(En, 0),
                Vt.multiplyScalar(-vn),
                ct.add(Vt)
            }
        }()
          , Ft = function() {
            const Vt = new Vector3;
            return function(vn, En) {
                nt.screenSpacePanning === !0 ? Vt.setFromMatrixColumn(En, 1) : (Vt.setFromMatrixColumn(En, 0),
                Vt.crossVectors(nt.object.up, Vt)),
                Vt.multiplyScalar(vn),
                ct.add(Vt)
            }
        }()
          , $t = function() {
            const Vt = new Vector3;
            return function(vn, En) {
                const Ut = nt.domElement;
                if (nt.object.isPerspectiveCamera) {
                    const Cn = nt.object.position;
                    Vt.copy(Cn).sub(nt.target);
                    let Tn = Vt.length();
                    Tn *= Math.tan(nt.object.fov / 2 * Math.PI / 180),
                    Tt(2 * vn * Tn / Ut.clientHeight, nt.object.matrix),
                    Ft(2 * En * Tn / Ut.clientHeight, nt.object.matrix)
                } else
                    nt.object.isOrthographicCamera ? (Tt(vn * (nt.object.right - nt.object.left) / nt.object.zoom / Ut.clientWidth, nt.object.matrix),
                    Ft(En * (nt.object.top - nt.object.bottom) / nt.object.zoom / Ut.clientHeight, nt.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),
                    nt.enablePan = !1)
            }
        }();
        function Wt(Vt) {
            nt.object.isPerspectiveCamera ? ut /= Vt : nt.object.isOrthographicCamera ? (nt.object.zoom = Math.max(nt.minZoom, Math.min(nt.maxZoom, nt.object.zoom * Vt)),
            nt.object.updateProjectionMatrix(),
            ht = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
            nt.enableZoom = !1)
        }
        function Kt(Vt) {
            nt.object.isPerspectiveCamera ? ut *= Vt : nt.object.isOrthographicCamera ? (nt.object.zoom = Math.max(nt.minZoom, Math.min(nt.maxZoom, nt.object.zoom / Vt)),
            nt.object.updateProjectionMatrix(),
            ht = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
            nt.enableZoom = !1)
        }
        function qt(Vt) {
            ft.set(Vt.clientX, Vt.clientY)
        }
        function jt(Vt) {
            _t.set(Vt.clientX, Vt.clientY)
        }
        function Bt(Vt) {
            yt.set(Vt.clientX, Vt.clientY)
        }
        function Xt(Vt) {
            gt.set(Vt.clientX, Vt.clientY),
            vt.subVectors(gt, ft).multiplyScalar(nt.rotateSpeed);
            const hn = nt.domElement;
            Zt(2 * Math.PI * vt.x / hn.clientHeight),
            Nt(2 * Math.PI * vt.y / hn.clientHeight),
            ft.copy(gt),
            nt.update()
        }
        function Jt(Vt) {
            bt.set(Vt.clientX, Vt.clientY),
            Mt.subVectors(bt, _t),
            Mt.y > 0 ? Wt(Ot()) : Mt.y < 0 && Kt(Ot()),
            _t.copy(bt),
            nt.update()
        }
        function Lt(Vt) {
            wt.set(Vt.clientX, Vt.clientY),
            mt.subVectors(wt, yt).multiplyScalar(nt.panSpeed),
            $t(mt.x, mt.y),
            yt.copy(wt),
            nt.update()
        }
        function Rt(Vt) {
            Vt.deltaY < 0 ? Kt(Ot()) : Vt.deltaY > 0 && Wt(Ot()),
            nt.update()
        }
        function _n(Vt) {
            let hn = !1;
            switch (Vt.code) {
            case nt.keys.UP:
                $t(0, nt.keyPanSpeed),
                hn = !0;
                break;
            case nt.keys.BOTTOM:
                $t(0, -nt.keyPanSpeed),
                hn = !0;
                break;
            case nt.keys.LEFT:
                $t(nt.keyPanSpeed, 0),
                hn = !0;
                break;
            case nt.keys.RIGHT:
                $t(-nt.keyPanSpeed, 0),
                hn = !0;
                break
            }
            hn && (Vt.preventDefault(),
            nt.update())
        }
        function Fn() {
            if (St.length === 1)
                ft.set(St[0].pageX, St[0].pageY);
            else {
                const Vt = .5 * (St[0].pageX + St[1].pageX)
                  , hn = .5 * (St[0].pageY + St[1].pageY);
                ft.set(Vt, hn)
            }
        }
        function Vn() {
            if (St.length === 1)
                yt.set(St[0].pageX, St[0].pageY);
            else {
                const Vt = .5 * (St[0].pageX + St[1].pageX)
                  , hn = .5 * (St[0].pageY + St[1].pageY);
                yt.set(Vt, hn)
            }
        }
        function sn() {
            const Vt = St[0].pageX - St[1].pageX
              , hn = St[0].pageY - St[1].pageY
              , vn = Math.sqrt(Vt * Vt + hn * hn);
            _t.set(0, vn)
        }
        function Un() {
            nt.enableZoom && sn(),
            nt.enablePan && Vn()
        }
        function zn() {
            nt.enableZoom && sn(),
            nt.enableRotate && Fn()
        }
        function Rn(Vt) {
            if (St.length == 1)
                gt.set(Vt.pageX, Vt.pageY);
            else {
                const vn = Ht(Vt)
                  , En = .5 * (Vt.pageX + vn.x)
                  , Ut = .5 * (Vt.pageY + vn.y);
                gt.set(En, Ut)
            }
            vt.subVectors(gt, ft).multiplyScalar(nt.rotateSpeed);
            const hn = nt.domElement;
            Zt(2 * Math.PI * vt.x / hn.clientHeight),
            Nt(2 * Math.PI * vt.y / hn.clientHeight),
            ft.copy(gt)
        }
        function Ln(Vt) {
            if (St.length === 1)
                wt.set(Vt.pageX, Vt.pageY);
            else {
                const hn = Ht(Vt)
                  , vn = .5 * (Vt.pageX + hn.x)
                  , En = .5 * (Vt.pageY + hn.y);
                wt.set(vn, En)
            }
            mt.subVectors(wt, yt).multiplyScalar(nt.panSpeed),
            $t(mt.x, mt.y),
            yt.copy(wt)
        }
        function Gn(Vt) {
            const hn = Ht(Vt)
              , vn = Vt.pageX - hn.x
              , En = Vt.pageY - hn.y
              , Ut = Math.sqrt(vn * vn + En * En);
            bt.set(0, Ut),
            Mt.set(0, Math.pow(bt.y / _t.y, nt.zoomSpeed)),
            Wt(Mt.y),
            _t.copy(bt)
        }
        function cn(Vt) {
            nt.enableZoom && Gn(Vt),
            nt.enablePan && Ln(Vt)
        }
        function bn(Vt) {
            nt.enableZoom && Gn(Vt),
            nt.enableRotate && Rn(Vt)
        }
        function Mn(Vt) {
            nt.enabled !== !1 && (St.length === 0 && (nt.domElement.setPointerCapture(Vt.pointerId),
            nt.domElement.addEventListener("pointermove", Dn),
            nt.domElement.addEventListener("pointerup", Pn)),
            An(Vt),
            Vt.pointerType === "touch" ? kt(Vt) : On(Vt))
        }
        function Dn(Vt) {
            nt.enabled !== !1 && (Vt.pointerType === "touch" ? pn(Vt) : Wn(Vt))
        }
        function Pn(Vt) {
            In(Vt),
            St.length === 0 && (nt.domElement.releasePointerCapture(Vt.pointerId),
            nt.domElement.removeEventListener("pointermove", Dn),
            nt.domElement.removeEventListener("pointerup", Pn)),
            nt.dispatchEvent(_endEvent),
            it = rt.NONE
        }
        function $n(Vt) {
            In(Vt)
        }
        function On(Vt) {
            let hn;
            switch (Vt.button) {
            case 0:
                hn = nt.mouseButtons.LEFT;
                break;
            case 1:
                hn = nt.mouseButtons.MIDDLE;
                break;
            case 2:
                hn = nt.mouseButtons.RIGHT;
                break;
            default:
                hn = -1
            }
            switch (hn) {
            case MOUSE.DOLLY:
                if (nt.enableZoom === !1)
                    return;
                jt(Vt),
                it = rt.DOLLY;
                break;
            case MOUSE.ROTATE:
                if (Vt.ctrlKey || Vt.metaKey || Vt.shiftKey) {
                    if (nt.enablePan === !1)
                        return;
                    Bt(Vt),
                    it = rt.PAN
                } else {
                    if (nt.enableRotate === !1)
                        return;
                    qt(Vt),
                    it = rt.ROTATE
                }
                break;
            case MOUSE.PAN:
                if (Vt.ctrlKey || Vt.metaKey || Vt.shiftKey) {
                    if (nt.enableRotate === !1)
                        return;
                    qt(Vt),
                    it = rt.ROTATE
                } else {
                    if (nt.enablePan === !1)
                        return;
                    Bt(Vt),
                    it = rt.PAN
                }
                break;
            default:
                it = rt.NONE
            }
            it !== rt.NONE && nt.dispatchEvent(_startEvent)
        }
        function Wn(Vt) {
            if (nt.enabled !== !1)
                switch (it) {
                case rt.ROTATE:
                    if (nt.enableRotate === !1)
                        return;
                    Xt(Vt);
                    break;
                case rt.DOLLY:
                    if (nt.enableZoom === !1)
                        return;
                    Jt(Vt);
                    break;
                case rt.PAN:
                    if (nt.enablePan === !1)
                        return;
                    Lt(Vt);
                    break
                }
        }
        function rr(Vt) {
            nt.enabled === !1 || nt.enableZoom === !1 || it !== rt.NONE || (nt.dispatchEvent(_startEvent),
            Rt(Vt),
            nt.dispatchEvent(_endEvent))
        }
        function Dt(Vt) {
            nt.enabled === !1 || nt.enablePan === !1 || _n(Vt)
        }
        function kt(Vt) {
            switch (Gt(Vt),
            St.length) {
            case 1:
                switch (nt.touches.ONE) {
                case TOUCH.ROTATE:
                    if (nt.enableRotate === !1)
                        return;
                    Fn(),
                    it = rt.TOUCH_ROTATE;
                    break;
                case TOUCH.PAN:
                    if (nt.enablePan === !1)
                        return;
                    Vn(),
                    it = rt.TOUCH_PAN;
                    break;
                default:
                    it = rt.NONE
                }
                break;
            case 2:
                switch (nt.touches.TWO) {
                case TOUCH.DOLLY_PAN:
                    if (nt.enableZoom === !1 && nt.enablePan === !1)
                        return;
                    Un(),
                    it = rt.TOUCH_DOLLY_PAN;
                    break;
                case TOUCH.DOLLY_ROTATE:
                    if (nt.enableZoom === !1 && nt.enableRotate === !1)
                        return;
                    zn(),
                    it = rt.TOUCH_DOLLY_ROTATE;
                    break;
                default:
                    it = rt.NONE
                }
                break;
            default:
                it = rt.NONE
            }
            it !== rt.NONE && nt.dispatchEvent(_startEvent)
        }
        function pn(Vt) {
            switch (Gt(Vt),
            it) {
            case rt.TOUCH_ROTATE:
                if (nt.enableRotate === !1)
                    return;
                Rn(Vt),
                nt.update();
                break;
            case rt.TOUCH_PAN:
                if (nt.enablePan === !1)
                    return;
                Ln(Vt),
                nt.update();
                break;
            case rt.TOUCH_DOLLY_PAN:
                if (nt.enableZoom === !1 && nt.enablePan === !1)
                    return;
                cn(Vt),
                nt.update();
                break;
            case rt.TOUCH_DOLLY_ROTATE:
                if (nt.enableZoom === !1 && nt.enableRotate === !1)
                    return;
                bn(Vt),
                nt.update();
                break;
            default:
                it = rt.NONE
            }
        }
        function mn(Vt) {
            nt.enabled
        }
        function An(Vt) {
            St.push(Vt)
        }
        function In(Vt) {
            delete At[Vt.pointerId];
            for (let hn = 0; hn < St.length; hn++)
                if (St[hn].pointerId == Vt.pointerId) {
                    St.splice(hn, 1);
                    return
                }
        }
        function Gt(Vt) {
            let hn = At[Vt.pointerId];
            hn === void 0 && (hn = new Vector2,
            At[Vt.pointerId] = hn),
            hn.set(Vt.pageX, Vt.pageY)
        }
        function Ht(Vt) {
            const hn = Vt.pointerId === St[0].pointerId ? St[1] : St[0];
            return At[hn.pointerId]
        }
        nt.domElement.addEventListener("contextmenu", mn),
        nt.domElement.addEventListener("pointerdown", Mn),
        nt.domElement.addEventListener("pointercancel", $n),
        nt.domElement.addEventListener("wheel", rr, {
            passive: !1
        }),
        this.update()
    }
}
class DeviceOrientationControls {
    constructor($) {
        Et(this, "object", null);
        Et(this, "enabled", !0);
        Et(this, "hasValue", !1);
        Et(this, "deviceOrientation", {});
        Et(this, "screenOrientation", 0);
        Et(this, "alphaOffset", 0);
        Et(this, "zee", new Vector3(0,0,1));
        Et(this, "euler", new Euler);
        Et(this, "q0", new Quaternion);
        Et(this, "q1", new Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5)));
        Et(this, "_onBoundDeviceOrientationChangeEvent");
        Et(this, "_onBoundScreenOrientationChangeEvent");
        this.object = $,
        this.object.rotation.reorder("YXZ"),
        this._onBoundDeviceOrientationChangeEvent = this._onDeviceOrientationChangeEvent.bind(this),
        this._onBoundScreenOrientationChangeEvent = this._onScreenOrientationChangeEvent.bind(this),
        this.connect()
    }
    _onDeviceOrientationChangeEvent($) {
        this.deviceOrientation = $
    }
    _onScreenOrientationChangeEvent() {
        this.screenOrientation = window.orientation || 0
    }
    setObjectQuaternion($, tt, nt, rt, it) {
        this.euler.set(nt, tt, -rt, "YXZ"),
        $.setFromEuler(this.euler),
        $.multiply(this.q1),
        $.multiply(this.q0.setFromAxisAngle(this.zee, -it))
    }
    connect() {
        this._onBoundScreenOrientationChangeEvent(),
        window.DeviceOrientationEvent !== void 0 && typeof window.DeviceOrientationEvent.requestPermission == "function" ? window.DeviceOrientationEvent.requestPermission().then(function($) {
            $ == "granted" && (window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, !1),
            window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, !1))
        }).catch(function($) {}) : (window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, !1),
        window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, !1)),
        this.enabled = !0
    }
    disconnect() {
        window.removeEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, !1),
        window.removeEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, !1),
        this.enabled = !1
    }
    update() {
        if (this.enabled === !1)
            return;
        let $ = this.deviceOrientation;
        if ($) {
            let tt = $.alpha ? MathUtils$1.degToRad($.alpha) + this.alphaOffset : 0
              , nt = $.beta ? MathUtils$1.degToRad($.beta) : 0
              , rt = $.gamma ? MathUtils$1.degToRad($.gamma) : 0
              , it = this.screenOrientation ? MathUtils$1.degToRad(this.screenOrientation) : 0;
            this.setObjectQuaternion(this.object.quaternion, tt, nt, rt, it),
            this.hasValue = $.alpha && $.beta && $.gamma
        }
    }
    dispose() {
        this.disconnect()
    }
}
class CameraControls {
    constructor() {
        Et(this, "useOrbitControls", settings.LOOK_DEV_MODE)
    }
    preInit($) {
        this.DEFAULT_CAMERA_POSITION = properties.cameraDefaultPosition,
        this.DEFAULT_LOOKAT_POSITION = new Vector3(0,0,0),
        this._brownianMotion = null,
        this._orbitControls = null,
        this._orbitCamera = null,
        this._camera = null,
        this._deviceOrientationControls = null,
        this._baseDeviceControlQuaternion = null,
        this._targetDeviceControlQuaternion = null,
        this._deviceOrientationCamera = null,
        this._hasDeviceOrientationControlValues = !1,
        this._q = new Quaternion,
        this._e = new Euler,
        this._v1 = new Vector3,
        this._v2 = new Vector3,
        this._camera = properties.camera,
        this._camera.position.copy(this.DEFAULT_CAMERA_POSITION),
        this._brownianMotion = new BrownianMotion,
        this.useOrbitControls === !0 && (this._orbitCamera = this._camera.clone(),
        this._orbitControls = new OrbitControls(this._orbitCamera,properties.canvas),
        this._orbitControls.target0.copy(this.DEFAULT_LOOKAT_POSITION),
        this._orbitControls.reset()),
        browser$1.isMobile && (this._deviceOrientationCamera = new Camera,
        this._baseDeviceControlQuaternion = new Quaternion,
        this._targetDeviceControlQuaternion = new Quaternion,
        this._deviceOrientationControls = new DeviceOrientationControls(this._deviceOrientationCamera),
        properties.onFirstClicked.addOnce(()=>{
            this._deviceOrientationControls.connect()
        }
        ))
    }
    init() {}
    resize($, tt) {}
    update($) {
        this._camera.matrix.identity(),
        this._camera.matrix.decompose(this._camera.position, this._camera.quaternion, this._camera.scale),
        this._camera.position.copy(this.DEFAULT_CAMERA_POSITION),
        this._camera.lookAt(this.DEFAULT_LOOKAT_POSITION),
        browser$1.isMobile && this._deviceOrientationControls.update(),
        this.useOrbitControls === !0 && (this._orbitControls.update(),
        this._orbitCamera.updateMatrix(),
        this._orbitCamera.matrix.decompose(this._camera.position, this._camera.quaternion, this._camera.scale)),
        this._v1.set(0, 0, -1).applyQuaternion(this._camera.quaternion),
        this.useOrbitControls === !0 ? this.cameraDistance = this._v2.copy(this._orbitControls.target).sub(this._camera.position).dot(this._v1) : this.cameraDistance = this._v2.copy(this.DEFAULT_LOOKAT_POSITION).sub(this._camera.position).dot(this._v1),
        browser$1.isMobile ? (this._deviceOrientationControls.update(),
        this._deviceOrientationControls.hasValue && (this._hasDeviceOrientationControlValues || (this._targetDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion),
        this._baseDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion)),
        this._targetDeviceControlQuaternion.slerp(this._deviceOrientationCamera.quaternion, .08),
        this._baseDeviceControlQuaternion.slerp(this._targetDeviceControlQuaternion, .08),
        this._q.copy(this._baseDeviceControlQuaternion).invert().multiply(this._targetDeviceControlQuaternion),
        this._hasDeviceOrientationControlValues = !0,
        this._camera.quaternion.multiply(this._q))) : (this._camera.translateZ(this.cameraDistance * -1),
        properties.cameraLookX += (input.mouseXY.y * properties.cameraLookStrength - properties.cameraLookX) * properties.cameraLookEaseDamp,
        properties.cameraLookY += (-input.mouseXY.x * properties.cameraLookStrength - properties.cameraLookY) * properties.cameraLookEaseDamp,
        this._e.set(properties.cameraLookX, properties.cameraLookY, 0),
        this._q.setFromEuler(this._e),
        this._camera.quaternion.multiply(this._q),
        this._camera.translateZ(this.cameraDistance)),
        this._camera.matrix.compose(this._camera.position, this._camera.quaternion, this._camera.scale),
        this._v1.set(0, 0, -1).applyQuaternion(this._camera.quaternion),
        this.useOrbitControls === !0 && (properties.cameraDistance = this._v2.copy(this._orbitControls.target).sub(this._camera.position).dot(this._v1))
    }
}
var cameraControls = new CameraControls;
class WebglApp {
    constructor() {
        Et(this, "settings", settings);
        Et(this, "properties", properties)
    }
    setCanvas($) {
        return properties.canvas = $,
        properties._isSupported = support.isSupported(),
        properties._isSupported
    }
    preInit($) {
        for (const [tt,nt] of Object.entries(settings.CROSS_ORIGINS))
            properties.loader.setCrossOrigin(tt, nt);
        properties.loader.register(BufItem),
        properties.loader.register(TextureItem),
        properties.loader.register(ThreeLoaderItem),
        settings.LOOK_DEV_MODE && gui.preInit(),
        this.preInitStage(),
        properties.isStageReady === !0 && (input.preInit(),
        visuals.preInit(),
        cameraControls.preInit(),
        properties.loader.start(tt=>{
            properties.percent = tt,
            $ && $(tt)
        }
        )),
        properties.themeSignal.add(tt=>{
            properties.themeId = tt
        }
        )
    }
    preInitStage() {
        properties.width = window.innerWidth,
        properties.height = window.innerHeight,
        properties.renderer = new WebGLRenderer({
            canvas: properties.canvas,
            context: properties.gl
        }),
        properties.scene = new Scene,
        properties.camera = new PerspectiveCamera(60,1,.1,10),
        properties.scene.add(properties.camera),
        properties.sharedUniforms.u_resolution.value = properties.resolution = new Vector2,
        properties.sharedUniforms.u_bgColor.value = properties.bgColor = new Color,
        fboHelper.init(properties.renderer, settings.RENDER_TARGET_FLOAT_TYPE),
        textureHelper.init(),
        properties.postprocessing = new Postprocessing,
        properties.postprocessing.init({
            scene: properties.scene,
            camera: properties.camera
        }),
        blueNoise.preInit(),
        glPositionOffset.init(),
        screenPaint.init(),
        properties.screenPaint = screenPaint,
        properties.smaa = new Smaa,
        properties.smaa.init(),
        properties.smaa.setTextures(properties.loader.add(settings.TEXTURE_PATH + "smaa-area.png", {
            weight: 32
        }).content, properties.loader.add(settings.TEXTURE_PATH + "smaa-search.png", {
            weight: .1
        }).content),
        properties.postprocessing.queue.push(properties.smaa),
        properties.bloom = new Bloom,
        properties.bloom.init(),
        properties.final = new Final,
        properties.final.init(),
        properties.postprocessing.queue.push(properties.final),
        properties.screenPaintDistortion = new ScreenPaintDistortion,
        properties.screenPaintDistortion.init({
            screenPaint
        }),
        properties.postprocessing.queue.push(properties.screenPaintDistortion),
        properties.isStageReady = !0
    }
    init() {
        properties.smaa && properties.smaa.updateTextures(),
        settings.LOOK_DEV_MODE && gui.init(),
        input.init(),
        visuals.init(),
        cameraControls.init(),
        properties.scene.add(visuals.container),
        this.resize(properties.rawWidth, properties.rawHeight),
        properties.hasInitialized = !0,
        settings.IS_DEV === !1 && settings.IS_API_MODE !== !0 && console.log("%c Created by Lusion: https://lusion.co", "border:2px solid gray; padding:5px; font-family:monospace; font-size:11px;")
    }
    resize($, tt) {
        let nt = settings.UP_SCALE
          , rt = $
          , it = tt
          , ot = $ * settings.DPR
          , st = tt * settings.DPR;
        if (settings.USE_PIXEL_LIMIT === !0 && ot * st > settings.MAX_PIXEL_COUNT) {
            let lt = ot / st;
            st = Math.sqrt(settings.MAX_PIXEL_COUNT / lt),
            ot = Math.ceil(st * lt),
            st = Math.ceil(st)
        }
        properties.rawWidth = rt,
        properties.rawHeight = it,
        properties.width = Math.ceil(ot / nt),
        properties.height = Math.ceil(st / nt),
        properties.resolution.set(properties.width, properties.height),
        properties.renderer.setSize(properties.width, properties.height),
        properties.canvas.width = properties.width,
        properties.canvas.height = properties.height,
        properties.canvas.style.width = `${properties.rawWidth}px`,
        properties.canvas.style.height = `${properties.rawHeight}px`,
        properties.camera.aspect = properties.width / properties.height,
        properties.camera.updateProjectionMatrix(),
        properties.postprocessing.setSize(properties.width, properties.height),
        screenPaint.resize(properties.width, properties.height),
        visuals.resize(properties.width, properties.height)
    }
    render($=0) {
        properties.time = properties.sharedUniforms.u_time.value += $,
        properties.deltaTime = properties.sharedUniforms.u_deltaTime.value = $,
        cameraControls.update($),
        blueNoise.update($),
        input.update($),
        visuals.update($),
        screenPaint.update($),
        properties.renderer.setClearColor(properties.bgColor, 1),
        properties.bgColor.setStyle(properties.bgColorHex),
        properties.bloom.amount = properties.bloomAmount,
        properties.bloom.radius = properties.bloomRadius,
        properties.bloom.threshold = properties.bloomThreshold,
        properties.bloom.smoothWidth = properties.bloomSmoothWidth,
        properties.bloom.haloWidth = properties.haloWidth,
        properties.bloom.haloRGBShift = properties.haloRGBShift,
        properties.bloom.haloStrength = properties.haloStrength,
        properties.bloom.haloMaskInner = properties.haloMaskInner,
        properties.bloom.haloMaskOuter = properties.haloMaskOuter,
        properties.final.vignetteFrom = properties.vignetteFrom,
        properties.final.vignetteTo = properties.vignetteTo,
        properties.final.vignetteColor.setStyle(properties.vignetteColorHex),
        properties.final.saturation = properties.saturation,
        properties.final.contrast = properties.contrast,
        properties.final.brightness = properties.brightness,
        properties.final.tintColor.setStyle(properties.tintColorHex),
        properties.final.tintOpacity = properties.tintOpacity,
        properties.final.bgColor.setStyle(properties.bgColorHex),
        properties.final.opacity = properties.opacity,
        properties.final.postInvert = properties.postInvert,
        screenPaint.needsMouseDown = properties.screenPaintNeedsMouseDown,
        screenPaint.minRadius = properties.screenPaintMinRadius,
        screenPaint.maxRadius = properties.screenPaintMaxRadius,
        screenPaint.radiusDistanceRange = properties.screenPaintRadiusDistanceRange,
        screenPaint.paintStrength = properties.screenPaintPaintStrength,
        screenPaint.pushStrength = properties.screenPaintPushStrength,
        screenPaint.velocityDissipation = properties.screenPaintVelocityDissipation,
        screenPaint.weight1Dissipation = properties.screenPaintWeight1Dissipation,
        screenPaint.weight2Dissipation = properties.screenPaintWeight2Dissipation,
        screenPaint.useNoise = properties.screenPaintUseNoise,
        screenPaint.curlScale = properties.screenPaintCurlScale,
        screenPaint.curlStrength = properties.screenPaintCurlStrength,
        properties.screenPaintDistortion.amount = properties.screenPaintDistortionAmount,
        properties.screenPaintDistortion.rgbShift = properties.screenPaintDistortionRGBShift,
        properties.screenPaintDistortion.colorMultiplier = properties.screenPaintDistortionColorMultiplier,
        properties.screenPaintDistortion.multiplier = properties.screenPaintDistortionMultiplier,
        properties.particleModeRatio += (properties.particleMode - properties.particleModeRatio) * .02,
        properties.postprocessing.render(properties.scene, properties.camera, !0),
        window.__debugTexture && fboHelper.debugTo(window.__debugTexture, 300, 300),
        input.postUpdate($)
    }
}
const AnyItem = properties.loader.ITEM_CLASSES.any
  , Xr = class extends AnyItem {
    constructor(tt, nt) {
        Xr.canvas || Xr.initCanvas(),
        nt.loadFunc = ()=>{}
        ,
        nt.hasLoading = nt.hasLoading === void 0 ? !0 : nt.hasLoading,
        nt.refText = "refing something...",
        nt.refFontSize = nt.refFontSize || 120,
        nt.refFont = nt.refFont || "monospace:400:italic",
        nt.interval = nt.interval || 20,
        nt.refTextWidth = 0;
        super(tt, nt);
        Et(this, "_getTextWidth", (tt,nt,rt,it)=>{
            let ot = Xr.ctx;
            return ot.font = rt + " " + nt + " " + this.refFontSize + "px " + tt + (it ? ", " + it : ""),
            ot.measureText(this.refText).width
        }
        );
        this.loadFunc = this._loadFunc.bind(this)
    }
    static initCanvas() {
        let tt = document.createElement("canvas");
        tt.width = tt.height = 1,
        Xr.canvas = tt,
        Xr.ctx = tt.getContext("2d")
    }
    _loadFunc(tt, nt, rt) {
        let it = tt.split(",")
          , ot = [];
        for (let gt = 0; gt < it.length; gt++)
            ot.push(it[gt].trim());
        it = this.refFont.split(":");
        let st = it[0]
          , lt = it[1] || "normal"
          , ut = it[2] || "normal"
          , ct = st;
        this.refTextWidth = this._getTextWidth(st, lt, ut);
        let ht, ft = ot.length;
        ht = setInterval(()=>{
            it = ot[0].split(":"),
            st = it[0],
            lt = it[1] || "normal",
            ut = it[2] || "normal",
            this._getTextWidth(st, lt, ut, ct) !== this.refTextWidth && (ot.shift(),
            rt.dispatch((ft - ot.length) / ft),
            ot.length === 0 && (clearInterval(ht),
            nt()))
        }
        , this.refInterval)
    }
    _onLoaderLoad(tt, nt) {
        this.content = nt,
        tt(nt)
    }
    _onLoaderLoading(tt, nt) {
        tt.dispatch(nt.loaded / nt.total)
    }
}
;
let FontItem = Xr;
Et(FontItem, "canvas"),
Et(FontItem, "ctx");
FontItem.type = "font";
FontItem.extensions = [];
let webGlApp = new WebglApp;
const canvas = document.getElementById("canvas")
  , uiContainer = document.getElementById("ui");
let dateTime = performance.now();
const isSupportedWebGL = webGlApp.setCanvas(canvas);
uiContainer.style.display = "none";
canvas.style.visibility = "hidden";
if (isSupportedWebGL && !settings.WEBGL_DISABLED) {
    let et = function() {
        InfiniteGrid$1.preInit(),
        webGlApp.preInit(st=>{
            st === 1 && $()
        }
        ),
        (settings.LOOK_DEV_MODE || settings.SKIP_ANIMATION) && useGlobalStore.setState(st=>{
            st.isLoadingComplete = !0,
            st.isLoaderAnimationComplete = !0
        }
        ),
        settings.NO_WEBGL && (canvas.style.display = "none")
    }
      , $ = function() {
        InfiniteGrid$1.init(),
        webGlApp.init()
    }
      , tt = function() {
        let st = window.innerWidth
          , lt = window.innerHeight;
        InfiniteGrid$1.onResize(),
        webGlApp.resize(st, lt),
        updateViewport(st, lt)
    }
      , nt = function() {
        const st = performance.now()
          , lt = (st - dateTime) / 1e3;
        dateTime = st,
        properties.uiLoops.forEach(ut=>{
            ut && ut(lt)
        }
        ),
        InfiniteGrid$1.update(lt),
        webGlApp.render(lt),
        window.requestAnimationFrame(nt)
    }
      , rt = function() {
        let st = "light";
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && (st = "dark");
        let lt = Object.values(THEMES).find(ut=>ut.name === st);
        useGlobalStore.setState(ut=>ut.currentTheme = lt.id),
        document.documentElement.setAttribute("data-theme", lt.name),
        properties.themeSignal.dispatch(lt.id)
    }
      , it = function() {
        rt(),
        properties.loader.register(FontItem),
        properties.loader.add("Aeonik:normal:normal,Aeonik:normal:italic,Aeonik:500:normal,Aeonik:900:normal,IBMPlexMono-Medium:normal:normal", {
            type: "font"
        }),
        properties.loader.start(st=>{
            st === 1 && (et(),
            window.addEventListener("resize", tt),
            tt(),
            settings.NO_WEBGL || (canvas.style.visibility = "visible",
            nt()),
            settings.NO_REACT || (uiContainer.style.display = "block",
            ReactApp()))
        }
        )
    }
      , ot = function(st=!0) {
        st ? properties.tabInFocus = !0 : (properties.tabInFocus = !1,
        updateLucyEmote$1("unamused", !0, !0))
    };
    webGlApp.settings.override({
        CROSS_ORIGINS: {
            "https://my_cdn/": "anonymous"
        }
    }),
    it(),
    document.addEventListener("visibilitychange", st=>{
        ot(document.visibilityState == "visible")
    }
    ),
    window.addEventListener("blur", ()=>{
        ot(!1)
    }
    ),
    window.addEventListener("focus", ()=>{
        ot(!0)
    }
    ),
    input.onDowned.add(()=>{
        useLogoStore.getState().lucyEmote === "unamused" && makeLucyWiggle()
    }
    )
} else
    canvas.style.visibility = "hidden",
    setTimeout(()=>{
        useGlobalStore.setState(et=>et.isLoadingComplete = !0)
    }
    , 1e3);
