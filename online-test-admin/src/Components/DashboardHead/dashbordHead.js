import React from 'react'
import './dashbord.css'

export default function DashbordHead({ values, page }) {

    return (
        <div className={`${page}-admin-2-out`}>
        <div className={`${page}-admin-2`}>
            {
                values.map((value,index) => (
                    <div className={`${page}-admin-2-1`} key={index}>
                        <div className={`${page}-admin-2-1-1`}>{value.title}</div>
                        <div className={`${page}-admin-2-1-2`}>{value.value}</div>
                    </div>
                ))
            }                       
        </div>

    </div>
    )
}
