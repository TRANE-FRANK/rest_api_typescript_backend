import { connectDB } from "../server"
import db from "../config/db"


jest.mock("../config/db")
describe("connectDB", () => {
  it("should handle database connection erro", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("ERROR AL CONECTAR A LA BASE DE DATOS"))
      const consoleSpy = jest.spyOn(console, "log")

      await connectDB()
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ERROR AL CONECTAR A LA BASE DE DATOS")
      )
      consoleSpy.mockRestore()
  })
})
