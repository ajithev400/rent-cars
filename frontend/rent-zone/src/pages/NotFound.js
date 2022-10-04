import React from 'react'

const NotFound = () => {
  return (
    <>

    <div>
    <div className="container bootstrap snippets bootdey" style={{"background": "#2E95EF"}}>
    <div className="row">
        <div className="col-md-12">
            <div className="pull-right" style={{"margin-top":"10px"}}>
                <div className="col-md-10 col-md-offset-1 pull-right">
                    <img className="img-error" src="https://bootdey.com/img/Content/fdfadfadsfadoh.png"/>
                    <h2>404 Not Found</h2>
                    <p>Sorry, an error has occured, Requested page not found!</p>
                    <div className="error-actions">
                        <a href="#" className="btn btn-primary btn-lg">
                            <span className="glyphicon glyphicon-arrow-left"></span>
                            Back Home 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>

    </>
  )
}

export default NotFound