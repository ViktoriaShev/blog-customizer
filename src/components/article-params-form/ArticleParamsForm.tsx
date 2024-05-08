import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text/Text';
import { Select } from '../select/index';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};
export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [selectFontFamily, setSelectFontFamily] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [selectFontSize, setSelectFontSize] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);
	const [selectFontColor, setSelectFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [selectBGColor, setSelectBGColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);
	const [selectContentWidth, setSelectContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);
	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: selectFontFamily,
			fontSizeOption: selectFontSize,
			fontColor: selectFontColor,
			backgroundColor: selectBGColor,
			contentWidth: selectContentWidth,
		});
	};
	const resetStyles = () => {
		setSelectFontFamily(defaultArticleState.fontFamilyOption);
		setSelectFontSize(defaultArticleState.fontSizeOption);
		setSelectFontColor(defaultArticleState.fontColor);
		setSelectBGColor(defaultArticleState.backgroundColor);
		setSelectContentWidth(defaultArticleState.contentWidth);
	};
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => {
			setIsOpen(false);
		},
		onChange: setIsOpen,
		event: 'mousedown',
	});
	return (
		<div ref={rootRef}>
			<ArrowButton
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				isOpen={isOpen}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleSubmitForm}>
					<Text
						size={31}
						weight={800}
						align='left'
						family='open-sans'
						fontStyle='normal'
						uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={selectFontFamily}
						options={fontFamilyOptions}
						onChange={setSelectFontFamily}
						title='шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectFontSize}
						title='Размер шрифта'
						onChange={setSelectFontSize}
					/>
					<Select
						selected={selectFontColor}
						options={fontColors}
						onChange={setSelectFontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectBGColor}
						options={backgroundColors}
						onChange={setSelectBGColor}
						title='цвет фона'
					/>
					<Select
						selected={selectContentWidth}
						options={contentWidthArr}
						onChange={setSelectContentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetStyles} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
