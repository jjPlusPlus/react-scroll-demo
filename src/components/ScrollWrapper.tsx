import React, { Component } from 'react';

/*
 *  ScrollWrapper
 *  A High-Order Component that returns the current scroll position in px, %, and whether it is at the top or bottom of the viewport
*/

interface OwnProps {
    WrappedComponent: any;
}

export default function (WrappedComponent: any) {
    class ScrollWrapper extends Component {
        constructor(props: OwnProps) {
            super(props);
            this.state = {
                verticalPosition: 0,
                scrollPercentage: 0,
                isTop: null,
                isBottom: null,
            }
        }

        componentDidMount() {
            this.computeScroll();
            window.addEventListener('scroll', this.computeScroll.bind(this), true);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.computeScroll, true);
        }

        computeScroll() {
            // the total scroll is the current vertical offset plus the height of the viewport
            const verticalPosition = window.pageYOffset || document.documentElement.scrollTop;
            const totalVerticalScroll = verticalPosition + document.documentElement.clientHeight;

            // lots of ways to measure the page height; get the 'tallest' one.
            const currentTotalHeight = Math.max( 
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            // scroll percentage: vertical position divided by the total remaining space (after client height)
            const spaceLeftOver = currentTotalHeight - document.documentElement.clientHeight;
            const scrollPercentage = Math.floor(verticalPosition / spaceLeftOver * 100);

            this.setState({ 
                scrollPercentage,
                verticalPosition: totalVerticalScroll,
                isTop: scrollPercentage === 0,
                isBottom: scrollPercentage === 100
            });
        }

        render() {
            return <WrappedComponent {...this.props} {...this.state} />
        }
    }

    return ScrollWrapper;
}