import { Component } from '@angular/core';
import { GROUPS } from '../../../models/group';

@Component( {
    selector: 'app-group-legend' ,
    templateUrl: './group-legend.component.html' ,
    styleUrls: [ './group-legend.component.scss' ] ,
} )
export class GroupLegendComponent {

    protected readonly GROUPS = GROUPS;
}
