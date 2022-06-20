interface IPropsSwipeRow<T> {
	/**
	 * Used by the SwipeListView to close rows on scroll events.
	 * You shouldn't need to use this prop explicitly.
	 */
	setScrollEnabled(enable: boolean): void;
	/**
	 * Called when it has been detected that a row should be swiped open.
	 */
	swipeGestureBegan(): void;
	/**
	 * Called when user has ended their swipe gesture
	 */
	swipeGestureEnded(): void;
	/**
	 * Called when a swipe row is animating open. Used by the SwipeListView
	 * to keep references to open rows.
	 */
	onRowOpen(toValue: number): void;
	/**
	 * Called when a swipe row has animated open.
	 */
	onRowDidOpen(toValue: number): void;

	onRowPress(): void;

	/**
	 * TranslateX value for opening the row to the left (positive number)
	 */
	leftOpenValue: number;
	/**
	 * TranslateX value for opening the row to the right (negative number)
	 */
	rightOpenValue: number;
	/**
	 * TranslateX value for stop the row to the left (positive number)
	 */
	stopLeftSwipe: number;
	/**
	 * TranslateX value for stop the row to the right (negative number)
	 */
	stopRightSwipe: number;
	/**
	 * Friction for the open / close animation
	 */
	friction: number;
	/**
	 * Tension for the open / close animation
	 */
	tension: number;
	/**
	 * RestSpeedThreshold for the open / close animation
	 */
	restSpeedThreshold: number;
	/**
	 * RestDisplacementThreshold for the open / close animation
	 */
	restDisplacementThreshold: number;
	/**
	 * Should the row be closed when it is tapped
	 */
	closeOnRowPress: boolean;
	/**
	 * Disable ability to swipe the row left
	 */
	disableLeftSwipe: boolean;
	/**
	 * Disable ability to swipe the row right
	 */
	disableRightSwipe: boolean;
	/**
	 * Enable hidden row onLayout calculations to run always
	 */
	recalculateHiddenLayout: boolean;
	/**
	 * Disable hidden row onLayout calculations
	 */
	disableHiddenLayoutCalculation: boolean;
	/**
	 * Called when a swipe row is animating closed
	 */
	onRowClose(): void;
	/**
	 * Called when a swipe row has animated closed
	 */
	onRowDidClose(): void;
	/**
	 * Styles for the parent wrapper View of the SwipeRow
	 */
	style: StyleProp<ViewStyle>;
	/**
	 * Should the row do a slide out preview to show that it is swipeable
	 */
	preview: boolean;
	/**
	 * Duration of the slide out preview animation
	 */
	previewDuration: number;
	/**
	 * Should the animation repeat until false is provided
	 */
	previewRepeat: boolean,
	/**
	 * Time between each full completed animation in milliseconds
	 * Default: 1000 (1 second)
	 */
	previewRepeatDelay: number,
	/**
	 * TranslateX value for the slide out preview animation
	 * Default: 0.5 * props.rightOpenValue
	 */
	previewOpenValue: number;
	/**
	 * The dx value used to detect when a user has begun a swipe gesture
	 */
	directionalDistanceChangeThreshold: number;
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row opening.
	 */
	swipeToOpenPercent: number;
	/**
	 * Describes how much the ending velocity of the gesture contributes to whether the swipe will result in the item being closed or open.
	 * A velocity factor of 0 means that the velocity will have no bearing on whether the swipe settles on a closed or open position
	 * and it'll just take into consideration the swipeToOpenPercent.
	 */
	swipeToOpenVelocityContribution: number;
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row closing.
	 */
	swipeToClosePercent: number;
	/**
	 * callback to determine whether component should update (currentItem, newItem)
	 */
	shouldItemUpdate(currentItem: T, newItem: T): void;
	/**
	 * Callback invoked any time the swipe value of the row is changed
	 */
	onSwipeValueChange(e: {
		isOpen: boolean;
		direction: 'left' | 'right';
		value: number;
	}): void;
	item: T;
}