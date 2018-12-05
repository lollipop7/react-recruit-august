import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';

export default class AIRecruitPage extends Component {

    render() {
        return (
            <ScrollPageContent>
                {this.props.children}
            </ScrollPageContent>
        );
    }
}