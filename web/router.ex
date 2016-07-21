defmodule Rosa.Router do
  use Rosa.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Rosa do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    get "/admin", PageController, :admin
  end

  # Other scopes may use custom stacks.
  # scope "/api", Rosa do
  #   pipe_through :api
  # end
end
