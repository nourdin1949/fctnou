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
                                            'data-target="#components-links-module-AdminModule-2fe9af70f6bfbeca4c0704b3c1d9e036e4cdb3025a2b743dc02e5e765f2d443f44eb2336a856c4aff5afc2cf3eb04255367059eb09a721c9433def4ac58cb237"' : 'data-target="#xs-components-links-module-AdminModule-2fe9af70f6bfbeca4c0704b3c1d9e036e4cdb3025a2b743dc02e5e765f2d443f44eb2336a856c4aff5afc2cf3eb04255367059eb09a721c9433def4ac58cb237"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-2fe9af70f6bfbeca4c0704b3c1d9e036e4cdb3025a2b743dc02e5e765f2d443f44eb2336a856c4aff5afc2cf3eb04255367059eb09a721c9433def4ac58cb237"' :
                                            'id="xs-components-links-module-AdminModule-2fe9af70f6bfbeca4c0704b3c1d9e036e4cdb3025a2b743dc02e5e765f2d443f44eb2336a856c4aff5afc2cf3eb04255367059eb09a721c9433def4ac58cb237"' }>
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
                                            'data-target="#components-links-module-AlumnosModule-3e5759930e06f3d3c0b6155f69786d1a4f321db3d4fd15e2f84c9e1557c9263408ce56cd2dc3e2c53ed3f229b1a090a162d873485e8f80c222fb6f6dbab84172"' : 'data-target="#xs-components-links-module-AlumnosModule-3e5759930e06f3d3c0b6155f69786d1a4f321db3d4fd15e2f84c9e1557c9263408ce56cd2dc3e2c53ed3f229b1a090a162d873485e8f80c222fb6f6dbab84172"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlumnosModule-3e5759930e06f3d3c0b6155f69786d1a4f321db3d4fd15e2f84c9e1557c9263408ce56cd2dc3e2c53ed3f229b1a090a162d873485e8f80c222fb6f6dbab84172"' :
                                            'id="xs-components-links-module-AlumnosModule-3e5759930e06f3d3c0b6155f69786d1a4f321db3d4fd15e2f84c9e1557c9263408ce56cd2dc3e2c53ed3f229b1a090a162d873485e8f80c222fb6f6dbab84172"' }>
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
                                            'data-target="#components-links-module-AlumnosModule-3ed525516a473d81df9b0580630df01803aae56512d0845bfd4d5982ae85a7b77b447eb6d580ec1fef80da73a224334318c4e562a1d539b589f17c0ee6d97e0a-1"' : 'data-target="#xs-components-links-module-AlumnosModule-3ed525516a473d81df9b0580630df01803aae56512d0845bfd4d5982ae85a7b77b447eb6d580ec1fef80da73a224334318c4e562a1d539b589f17c0ee6d97e0a-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlumnosModule-3ed525516a473d81df9b0580630df01803aae56512d0845bfd4d5982ae85a7b77b447eb6d580ec1fef80da73a224334318c4e562a1d539b589f17c0ee6d97e0a-1"' :
                                            'id="xs-components-links-module-AlumnosModule-3ed525516a473d81df9b0580630df01803aae56512d0845bfd4d5982ae85a7b77b447eb6d580ec1fef80da73a224334318c4e562a1d539b589f17c0ee6d97e0a-1"' }>
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
                                            'data-target="#components-links-module-AnexoVModule-c44860c3a48ea27fba539fe3ceecf2b4d8d7a2e747d9bacef561d140a8088f9f5afc461edecf86803e9bc92e06e51b08e3caacf1e2fb6d618d9541c7e1807043"' : 'data-target="#xs-components-links-module-AnexoVModule-c44860c3a48ea27fba539fe3ceecf2b4d8d7a2e747d9bacef561d140a8088f9f5afc461edecf86803e9bc92e06e51b08e3caacf1e2fb6d618d9541c7e1807043"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnexoVModule-c44860c3a48ea27fba539fe3ceecf2b4d8d7a2e747d9bacef561d140a8088f9f5afc461edecf86803e9bc92e06e51b08e3caacf1e2fb6d618d9541c7e1807043"' :
                                            'id="xs-components-links-module-AnexoVModule-c44860c3a48ea27fba539fe3ceecf2b4d8d7a2e747d9bacef561d140a8088f9f5afc461edecf86803e9bc92e06e51b08e3caacf1e2fb6d618d9541c7e1807043"' }>
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
                                            'data-target="#components-links-module-AppModule-b69dfe0e0e0848c25443829e34db39ec43a470b900320bc6dcd0f92d227b78e55a0a64c457e087fa7d9adb9bd12ba8ddb4ab16a683513536ac86448bd05e73a6"' : 'data-target="#xs-components-links-module-AppModule-b69dfe0e0e0848c25443829e34db39ec43a470b900320bc6dcd0f92d227b78e55a0a64c457e087fa7d9adb9bd12ba8ddb4ab16a683513536ac86448bd05e73a6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b69dfe0e0e0848c25443829e34db39ec43a470b900320bc6dcd0f92d227b78e55a0a64c457e087fa7d9adb9bd12ba8ddb4ab16a683513536ac86448bd05e73a6"' :
                                            'id="xs-components-links-module-AppModule-b69dfe0e0e0848c25443829e34db39ec43a470b900320bc6dcd0f92d227b78e55a0a64c457e087fa7d9adb9bd12ba8ddb4ab16a683513536ac86448bd05e73a6"' }>
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
                                            'data-target="#components-links-module-CentrosModule-c0d376bf0857ab9a93b342f4340bc1c60f5c9746836e386c6cdf96cdd0141799e1c7f4b56f895eeb8087bb18915930590cb9cb8a7be310517baa2a0d5fe28caa"' : 'data-target="#xs-components-links-module-CentrosModule-c0d376bf0857ab9a93b342f4340bc1c60f5c9746836e386c6cdf96cdd0141799e1c7f4b56f895eeb8087bb18915930590cb9cb8a7be310517baa2a0d5fe28caa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CentrosModule-c0d376bf0857ab9a93b342f4340bc1c60f5c9746836e386c6cdf96cdd0141799e1c7f4b56f895eeb8087bb18915930590cb9cb8a7be310517baa2a0d5fe28caa"' :
                                            'id="xs-components-links-module-CentrosModule-c0d376bf0857ab9a93b342f4340bc1c60f5c9746836e386c6cdf96cdd0141799e1c7f4b56f895eeb8087bb18915930590cb9cb8a7be310517baa2a0d5fe28caa"' }>
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
                                            'data-target="#components-links-module-ComponentsModule-e89b8d6630229321939ad95c46443c8503463076b974f8367f9976d8440bac28d47f6acece9a98792cbbe15607b149b521794c97cdcfd18b40f5e003f90f9c52"' : 'data-target="#xs-components-links-module-ComponentsModule-e89b8d6630229321939ad95c46443c8503463076b974f8367f9976d8440bac28d47f6acece9a98792cbbe15607b149b521794c97cdcfd18b40f5e003f90f9c52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-e89b8d6630229321939ad95c46443c8503463076b974f8367f9976d8440bac28d47f6acece9a98792cbbe15607b149b521794c97cdcfd18b40f5e003f90f9c52"' :
                                            'id="xs-components-links-module-ComponentsModule-e89b8d6630229321939ad95c46443c8503463076b974f8367f9976d8440bac28d47f6acece9a98792cbbe15607b149b521794c97cdcfd18b40f5e003f90f9c52"' }>
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
                                            'data-target="#components-links-module-CsvModule-cc1a880b25fbaf536e87773c22df02ce016d039fbbfd653d5a2c96115efdd46110c01395ec849f5871e69fa36df21784198c3505e41ed7c061e50fc070290cb7"' : 'data-target="#xs-components-links-module-CsvModule-cc1a880b25fbaf536e87773c22df02ce016d039fbbfd653d5a2c96115efdd46110c01395ec849f5871e69fa36df21784198c3505e41ed7c061e50fc070290cb7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CsvModule-cc1a880b25fbaf536e87773c22df02ce016d039fbbfd653d5a2c96115efdd46110c01395ec849f5871e69fa36df21784198c3505e41ed7c061e50fc070290cb7"' :
                                            'id="xs-components-links-module-CsvModule-cc1a880b25fbaf536e87773c22df02ce016d039fbbfd653d5a2c96115efdd46110c01395ec849f5871e69fa36df21784198c3505e41ed7c061e50fc070290cb7"' }>
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
                                            'data-target="#components-links-module-CursosModule-fe19a3e64acafd55b3c46a8645cf4c355fcfdd7d50376d83a04ef4ffbf701214c27eda56c9d4808f245e5dcd8e81e8f68643a8d7e1dbeafee9a271c5816cbfd0"' : 'data-target="#xs-components-links-module-CursosModule-fe19a3e64acafd55b3c46a8645cf4c355fcfdd7d50376d83a04ef4ffbf701214c27eda56c9d4808f245e5dcd8e81e8f68643a8d7e1dbeafee9a271c5816cbfd0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CursosModule-fe19a3e64acafd55b3c46a8645cf4c355fcfdd7d50376d83a04ef4ffbf701214c27eda56c9d4808f245e5dcd8e81e8f68643a8d7e1dbeafee9a271c5816cbfd0"' :
                                            'id="xs-components-links-module-CursosModule-fe19a3e64acafd55b3c46a8645cf4c355fcfdd7d50376d83a04ef4ffbf701214c27eda56c9d4808f245e5dcd8e81e8f68643a8d7e1dbeafee9a271c5816cbfd0"' }>
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
                                            'data-target="#components-links-module-EmpresasModule-ce9f18065d34ec3892368ab4c16b58459d71dd59ee3f67fadc31bcef0541bba0ef893204a6ecff6da9b975fe2a903cd0395e9c4cb9868e143a6ac3b4415f28fa"' : 'data-target="#xs-components-links-module-EmpresasModule-ce9f18065d34ec3892368ab4c16b58459d71dd59ee3f67fadc31bcef0541bba0ef893204a6ecff6da9b975fe2a903cd0395e9c4cb9868e143a6ac3b4415f28fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmpresasModule-ce9f18065d34ec3892368ab4c16b58459d71dd59ee3f67fadc31bcef0541bba0ef893204a6ecff6da9b975fe2a903cd0395e9c4cb9868e143a6ac3b4415f28fa"' :
                                            'id="xs-components-links-module-EmpresasModule-ce9f18065d34ec3892368ab4c16b58459d71dd59ee3f67fadc31bcef0541bba0ef893204a6ecff6da9b975fe2a903cd0395e9c4cb9868e143a6ac3b4415f28fa"' }>
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
                                            'data-target="#components-links-module-ProfesorModule-1146b3841dffa33fabd7c118ca9093531d2f2285d9b38c7ab672c302a7db0d4b1717b44be22dde888a6801b21384f90c67c7b49761e7f5316593f087c9a2670c"' : 'data-target="#xs-components-links-module-ProfesorModule-1146b3841dffa33fabd7c118ca9093531d2f2285d9b38c7ab672c302a7db0d4b1717b44be22dde888a6801b21384f90c67c7b49761e7f5316593f087c9a2670c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfesorModule-1146b3841dffa33fabd7c118ca9093531d2f2285d9b38c7ab672c302a7db0d4b1717b44be22dde888a6801b21384f90c67c7b49761e7f5316593f087c9a2670c"' :
                                            'id="xs-components-links-module-ProfesorModule-1146b3841dffa33fabd7c118ca9093531d2f2285d9b38c7ab672c302a7db0d4b1717b44be22dde888a6801b21384f90c67c7b49761e7f5316593f087c9a2670c"' }>
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
                                            'data-target="#components-links-module-ResponsableModule-b30c6a3aae0282816b351c36c8d1a7c8abb9a4ed422d803cec5ac9ab1266dc15cc4283593279f4a7dfa10b6102faa2fecfd434f498f78bf916d15466cbf110ae"' : 'data-target="#xs-components-links-module-ResponsableModule-b30c6a3aae0282816b351c36c8d1a7c8abb9a4ed422d803cec5ac9ab1266dc15cc4283593279f4a7dfa10b6102faa2fecfd434f498f78bf916d15466cbf110ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResponsableModule-b30c6a3aae0282816b351c36c8d1a7c8abb9a4ed422d803cec5ac9ab1266dc15cc4283593279f4a7dfa10b6102faa2fecfd434f498f78bf916d15466cbf110ae"' :
                                            'id="xs-components-links-module-ResponsableModule-b30c6a3aae0282816b351c36c8d1a7c8abb9a4ed422d803cec5ac9ab1266dc15cc4283593279f4a7dfa10b6102faa2fecfd434f498f78bf916d15466cbf110ae"' }>
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
                                            'data-target="#components-links-module-TutorEmpresaModule-33add9343ace7c850cf15c4119dba376e9507009305a60dfd308545e8c481e79404b36153c5a2e6095bf4871ba9e6accf6016785761c394c8b7274934f4fc524"' : 'data-target="#xs-components-links-module-TutorEmpresaModule-33add9343ace7c850cf15c4119dba376e9507009305a60dfd308545e8c481e79404b36153c5a2e6095bf4871ba9e6accf6016785761c394c8b7274934f4fc524"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TutorEmpresaModule-33add9343ace7c850cf15c4119dba376e9507009305a60dfd308545e8c481e79404b36153c5a2e6095bf4871ba9e6accf6016785761c394c8b7274934f4fc524"' :
                                            'id="xs-components-links-module-TutorEmpresaModule-33add9343ace7c850cf15c4119dba376e9507009305a60dfd308545e8c481e79404b36153c5a2e6095bf4871ba9e6accf6016785761c394c8b7274934f4fc524"' }>
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
                                            'data-target="#components-links-module-TutorEscolarModule-8c98ead92d05cac9ddb2ea2bab9936440328ab56bf076f8840d384ccd75157ff4ba3ad0ee4ea55b4fdb83f2f2b674394dca2a8dc6bafd80bac67c9822dbaf88a"' : 'data-target="#xs-components-links-module-TutorEscolarModule-8c98ead92d05cac9ddb2ea2bab9936440328ab56bf076f8840d384ccd75157ff4ba3ad0ee4ea55b4fdb83f2f2b674394dca2a8dc6bafd80bac67c9822dbaf88a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TutorEscolarModule-8c98ead92d05cac9ddb2ea2bab9936440328ab56bf076f8840d384ccd75157ff4ba3ad0ee4ea55b4fdb83f2f2b674394dca2a8dc6bafd80bac67c9822dbaf88a"' :
                                            'id="xs-components-links-module-TutorEscolarModule-8c98ead92d05cac9ddb2ea2bab9936440328ab56bf076f8840d384ccd75157ff4ba3ad0ee4ea55b4fdb83f2f2b674394dca2a8dc6bafd80bac67c9822dbaf88a"' }>
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