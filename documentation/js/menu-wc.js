'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fctfront documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-9d0de27c625b46f512ece6a6c31d39ffc65b0544146a5e62cd0579a9cd6bd768cd3ce49fddee45349da3e1796633424514e71237301417c7f0d638984bdc68e9"' : 'data-target="#xs-components-links-module-AdminModule-9d0de27c625b46f512ece6a6c31d39ffc65b0544146a5e62cd0579a9cd6bd768cd3ce49fddee45349da3e1796633424514e71237301417c7f0d638984bdc68e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-9d0de27c625b46f512ece6a6c31d39ffc65b0544146a5e62cd0579a9cd6bd768cd3ce49fddee45349da3e1796633424514e71237301417c7f0d638984bdc68e9"' :
                                            'id="xs-components-links-module-AdminModule-9d0de27c625b46f512ece6a6c31d39ffc65b0544146a5e62cd0579a9cd6bd768cd3ce49fddee45349da3e1796633424514e71237301417c7f0d638984bdc68e9"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CentrosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CentrosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlumnosModule.html" data-type="entity-link" >AlumnosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlumnosModule-dce0966695752f8e4d6d361eed514499ed22407d9fccfc5861752b4fcb6b547e6a7419e03728ddee4198ef2abf645afaefe98c20682bfaddc04d791baa71c654"' : 'data-target="#xs-components-links-module-AlumnosModule-dce0966695752f8e4d6d361eed514499ed22407d9fccfc5861752b4fcb6b547e6a7419e03728ddee4198ef2abf645afaefe98c20682bfaddc04d791baa71c654"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlumnosModule-dce0966695752f8e4d6d361eed514499ed22407d9fccfc5861752b4fcb6b547e6a7419e03728ddee4198ef2abf645afaefe98c20682bfaddc04d791baa71c654"' :
                                            'id="xs-components-links-module-AlumnosModule-dce0966695752f8e4d6d361eed514499ed22407d9fccfc5861752b4fcb6b547e6a7419e03728ddee4198ef2abf645afaefe98c20682bfaddc04d791baa71c654"' }>
                                            <li class="link">
                                                <a href="components/AlumnosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumnosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnexoVComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnexoVComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlumnosModule.html" data-type="entity-link" >AlumnosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlumnosModule-72266c3c6d1ea4cd02a195f224ee15691044a1278dfdfd951995705befab8627a530555f4a0dbdec3d38bdf2783ded2411b8768c4762178162bbad4ca9a05472-1"' : 'data-target="#xs-components-links-module-AlumnosModule-72266c3c6d1ea4cd02a195f224ee15691044a1278dfdfd951995705befab8627a530555f4a0dbdec3d38bdf2783ded2411b8768c4762178162bbad4ca9a05472-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlumnosModule-72266c3c6d1ea4cd02a195f224ee15691044a1278dfdfd951995705befab8627a530555f4a0dbdec3d38bdf2783ded2411b8768c4762178162bbad4ca9a05472-1"' :
                                            'id="xs-components-links-module-AlumnosModule-72266c3c6d1ea4cd02a195f224ee15691044a1278dfdfd951995705befab8627a530555f4a0dbdec3d38bdf2783ded2411b8768c4762178162bbad4ca9a05472-1"' }>
                                            <li class="link">
                                                <a href="components/AlumnosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumnosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InsertarAlumnosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarAlumnosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarAlumnosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarAlumnosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarAlumnosPracticaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarAlumnosPracticaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarAlumnosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarAlumnosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlumnosRoutingModule.html" data-type="entity-link" >AlumnosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AnexoVModule.html" data-type="entity-link" >AnexoVModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AnexoVModule-ace68fed98a90150cf0b2a72cc9bb810c75675144cba84382e3d7201d5e105763522aba43d2a6a3541d0e511c79ab8a22ca8b658d7185b0ab2146e92a99daa83"' : 'data-target="#xs-components-links-module-AnexoVModule-ace68fed98a90150cf0b2a72cc9bb810c75675144cba84382e3d7201d5e105763522aba43d2a6a3541d0e511c79ab8a22ca8b658d7185b0ab2146e92a99daa83"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnexoVModule-ace68fed98a90150cf0b2a72cc9bb810c75675144cba84382e3d7201d5e105763522aba43d2a6a3541d0e511c79ab8a22ca8b658d7185b0ab2146e92a99daa83"' :
                                            'id="xs-components-links-module-AnexoVModule-ace68fed98a90150cf0b2a72cc9bb810c75675144cba84382e3d7201d5e105763522aba43d2a6a3541d0e511c79ab8a22ca8b658d7185b0ab2146e92a99daa83"' }>
                                            <li class="link">
                                                <a href="components/BuscarPorFechaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuscarPorFechaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarioAnexoVComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarioAnexoVComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InsertarAnexoVComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarAnexoVComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarAnexoVComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarAnexoVComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AnexoVRoutingModule.html" data-type="entity-link" >AnexoVRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8c535959b378aa6572f7035e4c505bd5e4c328567ec9770bc134e748d6ee907febb5095ed31a30b431b8266c1f3ba233ded4a7a481f0fe818dbbf0357f14a99a"' : 'data-target="#xs-components-links-module-AppModule-8c535959b378aa6572f7035e4c505bd5e4c328567ec9770bc134e748d6ee907febb5095ed31a30b431b8266c1f3ba233ded4a7a481f0fe818dbbf0357f14a99a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8c535959b378aa6572f7035e4c505bd5e4c328567ec9770bc134e748d6ee907febb5095ed31a30b431b8266c1f3ba233ded4a7a481f0fe818dbbf0357f14a99a"' :
                                            'id="xs-components-links-module-AppModule-8c535959b378aa6572f7035e4c505bd5e4c328567ec9770bc134e748d6ee907febb5095ed31a30b431b8266c1f3ba233ded4a7a481f0fe818dbbf0357f14a99a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CentrosModule.html" data-type="entity-link" >CentrosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CentrosModule-ab5c63aa4114ffd92f5aeec840589396782e6c8675c8f151175b925cb08f5a46053f93187d373c61aaa41fba202d1bdfe94c15b44ef5d796ea6ae14b60fb36e9"' : 'data-target="#xs-components-links-module-CentrosModule-ab5c63aa4114ffd92f5aeec840589396782e6c8675c8f151175b925cb08f5a46053f93187d373c61aaa41fba202d1bdfe94c15b44ef5d796ea6ae14b60fb36e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CentrosModule-ab5c63aa4114ffd92f5aeec840589396782e6c8675c8f151175b925cb08f5a46053f93187d373c61aaa41fba202d1bdfe94c15b44ef5d796ea6ae14b60fb36e9"' :
                                            'id="xs-components-links-module-CentrosModule-ab5c63aa4114ffd92f5aeec840589396782e6c8675c8f151175b925cb08f5a46053f93187d373c61aaa41fba202d1bdfe94c15b44ef5d796ea6ae14b60fb36e9"' }>
                                            <li class="link">
                                                <a href="components/InsertarCentroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarCentroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarCentrosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarCentrosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarCentrosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarCentrosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CentrosRoutingModule.html" data-type="entity-link" >CentrosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-9765dcad883b16068dae5e332a1d2d7d0f7fed18ac99350c83cda98997f9b5e44d93824134aadb8266edbf9a49dbb778304b586bff3b1264b3058ee408009b41"' : 'data-target="#xs-components-links-module-ComponentsModule-9765dcad883b16068dae5e332a1d2d7d0f7fed18ac99350c83cda98997f9b5e44d93824134aadb8266edbf9a49dbb778304b586bff3b1264b3058ee408009b41"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-9765dcad883b16068dae5e332a1d2d7d0f7fed18ac99350c83cda98997f9b5e44d93824134aadb8266edbf9a49dbb778304b586bff3b1264b3058ee408009b41"' :
                                            'id="xs-components-links-module-ComponentsModule-9765dcad883b16068dae5e332a1d2d7d0f7fed18ac99350c83cda98997f9b5e44d93824134aadb8266edbf9a49dbb778304b586bff3b1264b3058ee408009b41"' }>
                                            <li class="link">
                                                <a href="components/ComponentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComponentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CsvModule.html" data-type="entity-link" >CsvModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CsvModule-94bc9b75f353513e5200efcb6d0d247bfd69cb75cdb93c83ab8068f8f82ac403f99fcc4d12d2612f9b6971df7ab15ef0db96315f1a03f58c903048db250aabd6"' : 'data-target="#xs-components-links-module-CsvModule-94bc9b75f353513e5200efcb6d0d247bfd69cb75cdb93c83ab8068f8f82ac403f99fcc4d12d2612f9b6971df7ab15ef0db96315f1a03f58c903048db250aabd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CsvModule-94bc9b75f353513e5200efcb6d0d247bfd69cb75cdb93c83ab8068f8f82ac403f99fcc4d12d2612f9b6971df7ab15ef0db96315f1a03f58c903048db250aabd6"' :
                                            'id="xs-components-links-module-CsvModule-94bc9b75f353513e5200efcb6d0d247bfd69cb75cdb93c83ab8068f8f82ac403f99fcc4d12d2612f9b6971df7ab15ef0db96315f1a03f58c903048db250aabd6"' }>
                                            <li class="link">
                                                <a href="components/AsignarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AsignarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AsignarRolesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AsignarRolesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CsvComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CsvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InsertarDatosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarDatosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CsvRoutingModule.html" data-type="entity-link" >CsvRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CursosModule.html" data-type="entity-link" >CursosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CursosModule-d56dedce89860cd12869194f897c05c380a3943dcc53e1e95383ba8e3c381b2a6de65fb9120cdd6f0fd78e80461acea77a0f515c94c6c5d1507c1e590ffcf269"' : 'data-target="#xs-components-links-module-CursosModule-d56dedce89860cd12869194f897c05c380a3943dcc53e1e95383ba8e3c381b2a6de65fb9120cdd6f0fd78e80461acea77a0f515c94c6c5d1507c1e590ffcf269"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CursosModule-d56dedce89860cd12869194f897c05c380a3943dcc53e1e95383ba8e3c381b2a6de65fb9120cdd6f0fd78e80461acea77a0f515c94c6c5d1507c1e590ffcf269"' :
                                            'id="xs-components-links-module-CursosModule-d56dedce89860cd12869194f897c05c380a3943dcc53e1e95383ba8e3c381b2a6de65fb9120cdd6f0fd78e80461acea77a0f515c94c6c5d1507c1e590ffcf269"' }>
                                            <li class="link">
                                                <a href="components/CursosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CursosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InsertarCursoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarCursoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarCursosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarCursosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarCursosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarCursosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CursosRoutingModule.html" data-type="entity-link" >CursosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmpresasModule.html" data-type="entity-link" >EmpresasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EmpresasModule-33e9dee270cc6208e4cb7dbdf071f419270bb8bb0646f872d41053f13a857fc7289d8034c981f86818f6edc1b6103a7366ca230f9e332ed0566c33d15f98b5ab"' : 'data-target="#xs-components-links-module-EmpresasModule-33e9dee270cc6208e4cb7dbdf071f419270bb8bb0646f872d41053f13a857fc7289d8034c981f86818f6edc1b6103a7366ca230f9e332ed0566c33d15f98b5ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmpresasModule-33e9dee270cc6208e4cb7dbdf071f419270bb8bb0646f872d41053f13a857fc7289d8034c981f86818f6edc1b6103a7366ca230f9e332ed0566c33d15f98b5ab"' :
                                            'id="xs-components-links-module-EmpresasModule-33e9dee270cc6208e4cb7dbdf071f419270bb8bb0646f872d41053f13a857fc7289d8034c981f86818f6edc1b6103a7366ca230f9e332ed0566c33d15f98b5ab"' }>
                                            <li class="link">
                                                <a href="components/EmpresasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmpresasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InsertarEmpresaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarEmpresaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarEmpresasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarEmpresasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarEmpresasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarEmpresasComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmpresasRoutingModule.html" data-type="entity-link" >EmpresasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfesorModule.html" data-type="entity-link" >ProfesorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfesorModule-40f6fb475f6fdc134900c186b8f3ff3065b92328b46f01791f08daf7a60869b42cbafd51a22626d18080490da0c575ff40793970cb1a4effb5c5d5491b3dc30a"' : 'data-target="#xs-components-links-module-ProfesorModule-40f6fb475f6fdc134900c186b8f3ff3065b92328b46f01791f08daf7a60869b42cbafd51a22626d18080490da0c575ff40793970cb1a4effb5c5d5491b3dc30a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfesorModule-40f6fb475f6fdc134900c186b8f3ff3065b92328b46f01791f08daf7a60869b42cbafd51a22626d18080490da0c575ff40793970cb1a4effb5c5d5491b3dc30a"' :
                                            'id="xs-components-links-module-ProfesorModule-40f6fb475f6fdc134900c186b8f3ff3065b92328b46f01791f08daf7a60869b42cbafd51a22626d18080490da0c575ff40793970cb1a4effb5c5d5491b3dc30a"' }>
                                            <li class="link">
                                                <a href="components/InsertarProfesorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarProfesorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarProfesorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarProfesorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarProfesorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarProfesorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfesorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfesorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfesorRoutingModule.html" data-type="entity-link" >ProfesorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ResponsableModule.html" data-type="entity-link" >ResponsableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResponsableModule-562e6e2b7f39df299ea068aaf3f49f481cbfc1efc33fba5639f83dc4b809d847122dffce34e19a21325ed54f4b00e3044c413bedf6c59135bbc7b6702ef6b4f5"' : 'data-target="#xs-components-links-module-ResponsableModule-562e6e2b7f39df299ea068aaf3f49f481cbfc1efc33fba5639f83dc4b809d847122dffce34e19a21325ed54f4b00e3044c413bedf6c59135bbc7b6702ef6b4f5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResponsableModule-562e6e2b7f39df299ea068aaf3f49f481cbfc1efc33fba5639f83dc4b809d847122dffce34e19a21325ed54f4b00e3044c413bedf6c59135bbc7b6702ef6b4f5"' :
                                            'id="xs-components-links-module-ResponsableModule-562e6e2b7f39df299ea068aaf3f49f481cbfc1efc33fba5639f83dc4b809d847122dffce34e19a21325ed54f4b00e3044c413bedf6c59135bbc7b6702ef6b4f5"' }>
                                            <li class="link">
                                                <a href="components/InsertarResponsableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertarResponsableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarResponsableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarResponsableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarResponsableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModificarResponsableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResponsableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponsableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResponsableRoutingModule.html" data-type="entity-link" >ResponsableRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-13b0e0068e27681b937bb9a1e3c44ed741035efad824b973c0dfc67e8cef5fea53dca5b5e4eaebfdf92298116b64a80424ec71b373616c2c68edb59d33c1d6d4"' : 'data-target="#xs-components-links-module-SharedModule-13b0e0068e27681b937bb9a1e3c44ed741035efad824b973c0dfc67e8cef5fea53dca5b5e4eaebfdf92298116b64a80424ec71b373616c2c68edb59d33c1d6d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-13b0e0068e27681b937bb9a1e3c44ed741035efad824b973c0dfc67e8cef5fea53dca5b5e4eaebfdf92298116b64a80424ec71b373616c2c68edb59d33c1d6d4"' :
                                            'id="xs-components-links-module-SharedModule-13b0e0068e27681b937bb9a1e3c44ed741035efad824b973c0dfc67e8cef5fea53dca5b5e4eaebfdf92298116b64a80424ec71b373616c2c68edb59d33c1d6d4"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SendVerificarEmailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SendVerificarEmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerificarEmailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerificarEmailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TutorEmpresaModule.html" data-type="entity-link" >TutorEmpresaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TutorEmpresaModule-abd8490f07d3a0094ddc452dea7aef937017996a3493cb0ae939d868cf876ee0d92a8f1220140981dbde10db4377ac8a73b1226f627df18dcd59dd148e7a8066"' : 'data-target="#xs-components-links-module-TutorEmpresaModule-abd8490f07d3a0094ddc452dea7aef937017996a3493cb0ae939d868cf876ee0d92a8f1220140981dbde10db4377ac8a73b1226f627df18dcd59dd148e7a8066"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TutorEmpresaModule-abd8490f07d3a0094ddc452dea7aef937017996a3493cb0ae939d868cf876ee0d92a8f1220140981dbde10db4377ac8a73b1226f627df18dcd59dd148e7a8066"' :
                                            'id="xs-components-links-module-TutorEmpresaModule-abd8490f07d3a0094ddc452dea7aef937017996a3493cb0ae939d868cf876ee0d92a8f1220140981dbde10db4377ac8a73b1226f627df18dcd59dd148e7a8066"' }>
                                            <li class="link">
                                                <a href="components/AlumnosEmpresaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumnosEmpresaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatEmpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatEmpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarTodosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarTodosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TutorEmpresaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TutorEmpresaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ValidarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TutorEscolarModule.html" data-type="entity-link" >TutorEscolarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TutorEscolarModule-8bce1d11bc3bfa83977d349b6293c698b531f70731ad56c9c0d9c2c0dbc574939e68787cb1e88fd8c11af2a666452aae6e4ad49aec06c43a3496a1f552a13f70"' : 'data-target="#xs-components-links-module-TutorEscolarModule-8bce1d11bc3bfa83977d349b6293c698b531f70731ad56c9c0d9c2c0dbc574939e68787cb1e88fd8c11af2a666452aae6e4ad49aec06c43a3496a1f552a13f70"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TutorEscolarModule-8bce1d11bc3bfa83977d349b6293c698b531f70731ad56c9c0d9c2c0dbc574939e68787cb1e88fd8c11af2a666452aae6e4ad49aec06c43a3496a1f552a13f70"' :
                                            'id="xs-components-links-module-TutorEscolarModule-8bce1d11bc3bfa83977d349b6293c698b531f70731ad56c9c0d9c2c0dbc574939e68787cb1e88fd8c11af2a666452aae6e4ad49aec06c43a3496a1f552a13f70"' }>
                                            <li class="link">
                                                <a href="components/AlumnoEscolarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlumnoEscolarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatEscoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatEscoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarAlumnosEscoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListarAlumnosEscoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TutorEscolarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TutorEscolarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ValidarTareaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidarTareaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AlumnosComponent-1.html" data-type="entity-link" >AlumnosComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/customValidatorCIFCentro.html" data-type="entity-link" >customValidatorCIFCentro</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorCIFCentroBYID.html" data-type="entity-link" >customValidatorCIFCentroBYID</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorCIFEmpresa.html" data-type="entity-link" >customValidatorCIFEmpresa</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorCIFEmpresaBYID.html" data-type="entity-link" >customValidatorCIFEmpresaBYID</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorCodigoPostal.html" data-type="entity-link" >customValidatorCodigoPostal</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatordDni.html" data-type="entity-link" >customValidatordDni</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatordDniBYID.html" data-type="entity-link" >customValidatordDniBYID</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorDNIEmpresa.html" data-type="entity-link" >customValidatorDNIEmpresa</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorDNIEmpresaBYID.html" data-type="entity-link" >customValidatorDNIEmpresaBYID</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorDNIRegistro.html" data-type="entity-link" >customValidatorDNIRegistro</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorDNIRegistroAlta.html" data-type="entity-link" >customValidatorDNIRegistroAlta</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorEmail.html" data-type="entity-link" >customValidatorEmail</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorEmailBYID.html" data-type="entity-link" >customValidatorEmailBYID</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorFecha.html" data-type="entity-link" >customValidatorFecha</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorFormatDNI.html" data-type="entity-link" >customValidatorFormatDNI</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorLocalidad.html" data-type="entity-link" >customValidatorLocalidad</a>
                            </li>
                            <li class="link">
                                <a href="classes/customValidatorProvincia.html" data-type="entity-link" >customValidatorProvincia</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileAlumnos.html" data-type="entity-link" >ValidarFileAlumnos</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileCentros.html" data-type="entity-link" >ValidarFileCentros</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileCursos.html" data-type="entity-link" >ValidarFileCursos</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileEmpresa.html" data-type="entity-link" >ValidarFileEmpresa</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileIMGPerfil.html" data-type="entity-link" >ValidarFileIMGPerfil</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileResponsables.html" data-type="entity-link" >ValidarFileResponsables</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidarFileTutores.html" data-type="entity-link" >ValidarFileTutores</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlumnosService.html" data-type="entity-link" >AlumnosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnexoVService.html" data-type="entity-link" >AnexoVService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CentrosService.html" data-type="entity-link" >CentrosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsvService.html" data-type="entity-link" >CsvService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CursosService.html" data-type="entity-link" >CursosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmpresasService.html" data-type="entity-link" >EmpresasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfesorService.html" data-type="entity-link" >ProfesorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponsableService.html" data-type="entity-link" >ResponsableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TutorEmpresaService.html" data-type="entity-link" >TutorEmpresaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TutorEscolarService.html" data-type="entity-link" >TutorEscolarService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticationAdminGuard.html" data-type="entity-link" >AuthenticationAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationAlumnoGuard.html" data-type="entity-link" >AuthenticationAlumnoGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationProfesorGuard.html" data-type="entity-link" >AuthenticationProfesorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationResponsableGuard.html" data-type="entity-link" >AuthenticationResponsableGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Alumno.html" data-type="entity-link" >Alumno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Centro.html" data-type="entity-link" >Centro</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Chat.html" data-type="entity-link" >Chat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Curso.html" data-type="entity-link" >Curso</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Empresa.html" data-type="entity-link" >Empresa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FCTAlumno.html" data-type="entity-link" >FCTAlumno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FCTAlumnoLista.html" data-type="entity-link" >FCTAlumnoLista</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profesor.html" data-type="entity-link" >Profesor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterUser.html" data-type="entity-link" >RegisterUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Responsable.html" data-type="entity-link" >Responsable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tarea.html" data-type="entity-link" >Tarea</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});