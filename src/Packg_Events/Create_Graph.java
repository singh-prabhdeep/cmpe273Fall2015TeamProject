package Packg_Events;
import javax.ws.rs.*;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;



import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;


public class Create_Graph {

	public static void main(String[] args) {
		JSONObject obj = new JSONObject();
		
		// TODO Auto-generated method stub
		Response response;
		String input = "urn:esn:Clyyy784hj/o+client2/o,client3/o,client4/o,client5/o";
		obj.put("packagedInfo", input);
		Client cl1 = ClientBuilder.newClient();
		WebTarget tar1 = cl1.target("http://localhost:8080/273_Proj_Server/boot/Graph");
		response = tar1.request(MediaType.APPLICATION_JSON).post(Entity.json(obj));

	}

}
