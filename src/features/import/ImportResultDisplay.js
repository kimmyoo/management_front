import React from 'react'
import { nanoid } from 'nanoid'

const ImportResultDisplay = ({ result }) => {

    const content = (
        <div>
            <p className='warn'>Upload result will be displayed here</p>
            {
                result &&
                <ol>
                    <li>{`${result.created.length} students created.`}</li>
                    <li>
                        {`${result.updated.length} students updated.`}
                        {
                            result.updated && result.updated.map(entry => {
                                return <p className='warn' key={nanoid()}>{entry} </p>
                            })
                        }
                    </li>
                    <li>
                        {`${result.failed.length} entries failed.`}
                        {
                            result.failed && result.failed.map(entry => {
                                return <p className="error" key={nanoid()}>{entry} </p>
                            })
                        }
                    </li>
                </ol>
            }

        </div>
    )

    return (
        content
    )
}

export default ImportResultDisplay