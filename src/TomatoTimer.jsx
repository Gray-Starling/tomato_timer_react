import { useEffect, useState } from 'react'
import style from './TomatoTimer.module.scss'
import { FaWindowClose, FaPlay, FaPause, FaUndo } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

export const TomatoTimer = () => {
	const [popUp, setPopUp] = useState(false)
	const [isWorkTimeActive, setIsWorkTime] = useState(true)
	const [workTime, setWorkTime] = useState(25)
	const [breakTime, setBreakMinutes] = useState(5)
	const [seconds, setSeconds] = useState('')
	const [isActive, setIsActive] = useState(false)
	let interval

	const changeTimer = () => {
		setIsWorkTime(prevIsWorkTime => !prevIsWorkTime)
		const time = !isWorkTimeActive ? workTime : breakTime
		setIsActive(false)
		setSeconds(time * 60)
	}

	const togglePopUp = () => {
		setPopUp(prevPopUp => !prevPopUp)
	}

	const handleFormSubmit = ev => {
		ev.preventDefault()
		togglePopUp()
		setIsWorkTime(true)
		setSeconds(workTime * 60)
		setIsActive(false)
	}

	const handleStartStop = () => {
		setIsActive(prevIsActive => !prevIsActive)
	}

	const handleReset = () => {
		setSeconds(workTime * 60)
		setIsActive(false)
		setIsWorkTime(true)
	}

	const formatTime = time => {
		const minutes = Math.floor(time / 60)
			.toString()
			.padStart(2, '0')
		const seconds = (time % 60).toString().padStart(2, '0')
		return `${minutes}:${seconds}`
	}

	useEffect(() => setSeconds(workTime * 60), [])

	useEffect(() => {
		if (isActive && seconds > 0) {
			interval = setInterval(() => {
				setSeconds(prevSeconds => prevSeconds - 1)
			}, 1000)
		} else if (seconds === 0) {
			clearInterval(interval)
		}

		return () => clearInterval(interval)
	}, [isActive, seconds])

	return (
		<div className={style.tomato__container}>
			{/* <CodeOnGitHub to="https://github.com/Gray-Starling/React_Calculator" /> */}
			<div className={style.tomato}>
				<div className={style.tomato__settingsBtn} onClick={togglePopUp}>
					<FiSettings />
				</div>
				<div className={style.tomato__panel}>
					<div
						className={
							isWorkTimeActive
								? `${style.tomato__statusBtn} ${style.active}`
								: style.tomato__statusBtn
						}
						onClick={changeTimer}
					>
						Work
					</div>
					<div
						className={
							!isWorkTimeActive
								? `${style.tomato__statusBtn} ${style.active}`
								: style.tomato__statusBtn
						}
						onClick={changeTimer}
					>
						Break
					</div>
				</div>
				<div className={style.tomato__timer}>
					<span>{formatTime(seconds)}</span>
				</div>
				<div className={style.tomato__controlsBlock}>
					<div className={style.tomato__controlBtn} onClick={handleStartStop}>
						{isActive ? <FaPause /> : <FaPlay />}
					</div>
					<div className={style.tomato__controlBtn} onClick={handleReset}>
						<FaUndo />
					</div>
				</div>
			</div>
			{popUp && (
				<div className={style.popupWrp}>
					<div className={style.popup__close} onClick={togglePopUp}>
						<FaWindowClose />
					</div>
					<div className={style.popup__settingsBlock}>
						<div className={style.popup__title}>Settings</div>
						<form className={style.popup__form} onSubmit={handleFormSubmit}>
							<label>Time of work</label>
							<input
								type='text'
								id='workTime'
								name='work'
								value={workTime}
								onChange={ev => setWorkTime(ev.target.value)}
							/>
							<label>Time of break</label>
							<input
								type='text'
								id='breakTime'
								name='break'
								value={breakTime}
								onChange={ev => setBreakMinutes(ev.target.value)}
							/>
							<div className={style.popup__saveBtn}>
								<button>Save</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
