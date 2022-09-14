<div className='calendar_section'>
  <div className='week_section'>
    {weekList?.map((v, i) => (
      <>
        <div
          className={cn('week_box', i === now.getDay() && now.getDate() === getDay(v) ? 'now' : '')}
        >
          <h3 className={cn('week_title', i === 0 ? 'sun' : i === 6 ? 'sat' : '')}>
            {weekDays[i]}
          </h3>
          <p className={cn(`week_${getDay(v)}`)}>{getDay(v)}</p>
        </div>
      </>
    ))}
  </div>
  <div className={cn('attendance_section', attendanceData?.length === 0 ? '' : 'attendance_bg')}>
    {attendanceData?.map(v => (
      <div
        className='attendance_box'
        onMouseOver={() => {
          v.attendance_date?.split(',').map(v => {
            const day = getDay(v);
            const dayId = document.querySelector(`.week_${day}`);
            console.log(dayId);
            dayId?.classList.add(`week_circle${day < 10 ? '2' : ''}`);
          });
        }}
        onMouseLeave={() => {
          v.attendance_date?.split(',').map(v => {
            const day = getDay(v);
            const dayId = document.querySelector(`.week_${day}`);
            dayId?.classList.remove(`week_circle${day < 10 ? '2' : ''}`);
          });
        }}
      >
        <div className='text_left'>
          <div className='circle'>
            <img src={`${v.image_url}`} />
          </div>
          <p>
            {v.attendance_date
              ?.split(',')
              .map(v => getDay(v) + '일')
              ?.join(', ')}
          </p>
        </div>
        <p className='text_right'>({v.count})</p>
      </div>
    ))}
  </div>
</div>;
